import { useState, useEffect } from 'react';
import type { Recipe } from '@/types';
import { useWakeLock } from '@/hooks/useWakeLock';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CookingModeProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

const CookingMode = ({ isOpen, onClose, recipe }: CookingModeProps) => {
  const [step, setStep] = useState(0);
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  useEffect(() => {
    if (isOpen) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
  }, [isOpen, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    // Reset step when recipe changes or dialog is reopened
    setStep(0);
  }, [isOpen, recipe]);

  const handleNext = () => {
    if (step < recipe.instructions.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progressValue = ((step + 1) / recipe.instructions.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2 flex-row items-center gap-4 space-y-0">
          <img src={recipe.imageUrl} alt={recipe.name} className="h-16 w-16 rounded-md object-cover hidden sm:block" />
          <div>
            <DialogTitle className="text-2xl">Cooking Mode</DialogTitle>
            <p className="text-muted-foreground">{recipe.name}</p>
          </div>
        </DialogHeader>
        <div className="px-6">
          <Progress value={progressValue} className="w-full" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Step {step + 1} of {recipe.instructions.length}
          </p>
        </div>
        <div className="flex-grow flex items-center justify-center p-6 md:p-12 text-center">
          <p className="text-2xl md:text-4xl leading-relaxed">
            {recipe.instructions[step]}
          </p>
        </div>
        <DialogFooter className="p-6 border-t bg-secondary/50 flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {step < recipe.instructions.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <DialogClose asChild>
              <Button>Finish</Button>
            </DialogClose>
          )}
        </DialogFooter>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CookingMode;