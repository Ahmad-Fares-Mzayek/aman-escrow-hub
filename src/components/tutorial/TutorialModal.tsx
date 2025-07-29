import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  LayoutDashboard, 
  ShoppingCart, 
  DollarSign, 
  CreditCard,
  User,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to AMN | أمن",
    description: "Your secure middleman for individual transactions",
    icon: <Shield className="h-12 w-12 text-primary" />,
    content: "Welcome to AMN | أمن — your secure middleman for individual transactions. Let's take a quick tour to help you get started with safe buying and selling."
  },
  {
    id: 2,
    title: "Dashboard Overview",
    description: "Your control center for transactions",
    icon: <LayoutDashboard className="h-12 w-12 text-primary" />,
    content: "This is your control center. View your spending, earnings, and transaction activity right here. You can see your total spent, total received, and your unique Seller ID."
  },
  {
    id: 3,
    title: "How to Buy",
    description: "Initiating secure purchases",
    icon: <ShoppingCart className="h-12 w-12 text-primary" />,
    content: "Initiate a transaction by entering a Seller ID and Product ID. We'll pull the details for you, including seller name, product information, and price. Once you confirm, the seller will be notified."
  },
  {
    id: 4,
    title: "How to Sell",
    description: "Managing your products",
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    content: "Manage your product list here. Add new items with names, prices, and descriptions. Each product gets a unique ID that buyers can use to find your items easily using your Seller ID."
  },
  {
    id: 5,
    title: "Payments & Confirmations",
    description: "Tracking transaction progress",
    icon: <CreditCard className="h-12 w-12 text-primary" />,
    content: "Track every payment in the Payments section. As a buyer, confirm receipt to release funds to the seller. As a seller, get paid once the buyer approves. You can also file complaints if needed."
  },
  {
    id: 6,
    title: "Profile & Settings",
    description: "Managing your account",
    icon: <User className="h-12 w-12 text-primary" />,
    content: "Access settings, log out, or replay this tutorial anytime by clicking your profile avatar. Your Seller ID is always displayed here for easy sharing with buyers."
  }
];

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const { user } = useAuth();

  const currentStepData = tutorialSteps.find(step => step.id === currentStep);
  const progress = (currentStep / tutorialSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowExitConfirm(true);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
    setCurrentStep(1);
    setShowExitConfirm(false);
  };

  const handleResumeLater = () => {
    onClose();
    setShowExitConfirm(false);
    // Don't reset step so user can resume where they left off
  };

  const handleExit = () => {
    setShowExitConfirm(false);
    onClose();
    setCurrentStep(1);
  };

  if (!currentStepData) return null;

  return (
    <>
      <Dialog open={isOpen && !showExitConfirm} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {tutorialSteps.length}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip Tutorial
              </Button>
            </div>
            
            <Progress value={progress} className="mb-6" />
            
            <div className="flex justify-center mb-4">
              {currentStepData.icon}
            </div>
            
            <DialogTitle className="text-2xl font-bold text-center">
              {currentStepData.title}
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {currentStepData.description}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <p className="text-foreground/80 leading-relaxed text-center">
              {currentStepData.content}
            </p>
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index + 1 === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button 
              onClick={handleNext}
              className="trust-gradient hover:opacity-90"
            >
              {currentStep === tutorialSteps.length ? 'Complete' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <X className="mr-2 h-5 w-5" />
              Exit Tutorial?
            </DialogTitle>
            <DialogDescription>
              You're on step {currentStep} of {tutorialSteps.length}. What would you like to do?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleResumeLater}
              variant="outline" 
              className="w-full"
            >
              Resume Later
            </Button>
            <Button 
              onClick={handleExit}
              variant="destructive" 
              className="w-full"
            >
              Skip Tutorial
            </Button>
            <Button 
              onClick={() => setShowExitConfirm(false)}
              className="w-full"
            >
              Continue Tutorial
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Completion Modal */}
      {currentStep > tutorialSteps.length && (
        <Dialog open={true} onOpenChange={handleComplete}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-success" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold">
                You're All Set!
              </DialogTitle>
              <DialogDescription>
                That's it! You're ready to securely buy and sell with AMN. Let's get started.
              </DialogDescription>
            </DialogHeader>

            <div className="flex space-x-3 pt-6">
              <Button 
                onClick={handleComplete}
                className="flex-1 trust-gradient hover:opacity-90"
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={() => setCurrentStep(1)}
                variant="outline"
              >
                Replay Tutorial
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};