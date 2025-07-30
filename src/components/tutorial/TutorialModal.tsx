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
import { useTranslation } from 'react-i18next';
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

const getTutorialSteps = (t: any): TutorialStep[] => [
  {
    id: 1,
    title: t('tutorial.step1.title'),
    description: t('tutorial.step1.description'),
    icon: <Shield className="h-12 w-12 text-primary" />,
    content: t('tutorial.step1.content')
  },
  {
    id: 2,
    title: t('tutorial.step2.title'),
    description: t('tutorial.step2.description'),
    icon: <LayoutDashboard className="h-12 w-12 text-primary" />,
    content: t('tutorial.step2.content')
  },
  {
    id: 3,
    title: t('tutorial.step3.title'),
    description: t('tutorial.step3.description'),
    icon: <ShoppingCart className="h-12 w-12 text-primary" />,
    content: t('tutorial.step3.content')
  },
  {
    id: 4,
    title: t('tutorial.step4.title'),
    description: t('tutorial.step4.description'),
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    content: t('tutorial.step4.content')
  },
  {
    id: 5,
    title: t('tutorial.step5.title'),
    description: t('tutorial.step5.description'),
    icon: <CreditCard className="h-12 w-12 text-primary" />,
    content: t('tutorial.step5.content')
  },
  {
    id: 6,
    title: t('tutorial.step6.title'),
    description: t('tutorial.step6.description'),
    icon: <User className="h-12 w-12 text-primary" />,
    content: t('tutorial.step6.content')
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
  const { t, i18n } = useTranslation();
  
  const tutorialSteps = getTutorialSteps(t);
  const currentStepData = tutorialSteps.find(step => step.id === currentStep);
  const progress = (currentStep / tutorialSteps.length) * 100;
  const isRTL = i18n.language === 'ar';

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
                {t('tutorial.step')} {currentStep} {t('tutorial.of')} {tutorialSteps.length}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                {t('tutorial.skip')}
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
              className={isRTL ? 'flex-row-reverse' : ''}
            >
              {!isRTL && <ArrowLeft className="mr-2 h-4 w-4" />}
              {t('tutorial.previous')}
              {isRTL && <ArrowLeft className="ml-2 h-4 w-4" />}
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
              className={`trust-gradient hover:opacity-90 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {!isRTL && <ArrowRight className="ml-2 h-4 w-4" />}
              {currentStep === tutorialSteps.length ? t('tutorial.complete') : t('tutorial.next')}
              {isRTL && <ArrowRight className="mr-2 h-4 w-4" />}
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
              {t('tutorial.exit')}
            </DialogTitle>
            <DialogDescription>
              {t('tutorial.exitMessage', { step: currentStep, total: tutorialSteps.length })}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleResumeLater}
              variant="outline" 
              className="w-full"
            >
              {t('tutorial.resumeLater')}
            </Button>
            <Button 
              onClick={handleExit}
              variant="destructive" 
              className="w-full"
            >
              {t('tutorial.skip')}
            </Button>
            <Button 
              onClick={() => setShowExitConfirm(false)}
              className="w-full"
            >
              {t('tutorial.continueTutorial')}
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
                {t('tutorial.youreAllSet')}
              </DialogTitle>
              <DialogDescription>
                {t('tutorial.completionMessage')}
              </DialogDescription>
            </DialogHeader>

            <div className="flex space-x-3 pt-6">
              <Button 
                onClick={handleComplete}
                className="flex-1 trust-gradient hover:opacity-90"
              >
                {t('tutorial.goToDashboard')}
              </Button>
              <Button 
                onClick={() => setCurrentStep(1)}
                variant="outline"
              >
                {t('tutorial.replayTutorial')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};