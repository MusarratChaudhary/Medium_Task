"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  children: React.ReactNode;
  onConfirm: () => Promise<void>;
  title?: string;
  description?: string;
}

export function DeleteConfirmationModal({ 
  children, 
  onConfirm, 
  title = "Delete Note", 
  description = "Are you sure you want to delete this note? This action cannot be undone." 
}: DeleteConfirmationModalProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        {children}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" />
        <DialogPrimitive.Content 
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-2xl duration-200 animate-in fade-in zoom-in-95 sm:rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                <Trash2 className="h-4 w-4" />
              </div>
              <DialogPrimitive.Title className="text-sm font-semibold">{title}</DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-secondary transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10 mb-6">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <DialogPrimitive.Description className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </DialogPrimitive.Description>
          </div>

          <div className="flex items-center justify-end gap-3">
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="sm" className="h-10 px-6 text-xs font-bold hover:bg-secondary" disabled={loading}>Cancel</Button>
            </DialogPrimitive.Close>
            <Button 
              variant="destructive"
              size="sm" 
              className="h-10 px-8 text-xs font-bold shadow-lg shadow-destructive/20" 
              onClick={handleConfirm} 
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
