import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircleIcon } from 'lucide-react';
import { useState } from 'react';

interface RecordErrorDialogProps {
  error: {
    title: string;
    description: string;
  } | null;
  setError: (value: null) => void;
}
export function RecordErrorDialog({ error, setError }: RecordErrorDialogProps) {
  return (
    <AlertDialog
      open={error != null}
      onOpenChange={(open) => {
        if (!open) {
          setError(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="flex-row">
          <AlertCircleIcon className="text-red-1" />
          <div>
            <AlertDialogTitle>{error?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {error?.description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>닫기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useRecordError() {
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return [error, setError] as const;
}
