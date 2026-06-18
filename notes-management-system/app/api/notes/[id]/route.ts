import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import { getUserIdFromToken } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserIdFromToken();
    console.log('PUT - userId:', userId);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    console.log('PUT - noteId:', id);
    const { title, content, tags } = await req.json();
    console.log('PUT - data:', { title, content, tags });

    await dbConnect();

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content, tags },
      { new: true }
    );
    console.log('PUT - updatedNote:', note);

    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('PUT - error:', error);
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    // Soft delete
    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { isDeleted: true },
      { new: true }
    );

    if (!note) {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Note moved to trash' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { action } = await req.json(); // action: 'restore' or 'delete_permanently'

    await dbConnect();

    if (action === 'restore') {
      const note = await Note.findOneAndUpdate(
        { _id: id, userId },
        { isDeleted: false },
        { new: true }
      );
      if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404 });
      return NextResponse.json(note);
    } else if (action === 'delete_permanently') {
      const note = await Note.findOneAndDelete({ _id: id, userId });
      if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404 });
      return NextResponse.json({ message: 'Note permanently deleted' });
    } else if (action === 'toggle_favorite') {
      const note = await Note.findOne({ _id: id, userId });
      if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404 });
      note.isFavorite = !note.isFavorite;
      await note.save();
      return NextResponse.json(note);
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}
