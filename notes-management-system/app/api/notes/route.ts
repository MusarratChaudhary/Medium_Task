import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const query: { userId: string; $or?: Array<{ [key: string]: { $regex: string; $options: string } }> } = { userId };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });

    return NextResponse.json(notes);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, tags } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    await dbConnect();

    const newNote = new Note({
      title,
      content,
      tags: tags || [],
      userId,
    });

    await newNote.save();

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}
