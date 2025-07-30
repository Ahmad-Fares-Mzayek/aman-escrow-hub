import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'signin' 
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        toast({
          title: t('auth.welcomeBackToast'),
          description: t('auth.signInSuccessToast'),
        });
      } else {
        await signUp({ name, email });
        toast({
          title: t('auth.accountCreatedToast'),
          description: t('auth.welcomeToast'),
        });
      }
      onClose();
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      toast({
        title: t('auth.authFailedToast'),
        description: error instanceof Error ? error.message : t('auth.tryAgainToast'),
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setEmail('');
    setPassword('');
    setName('');
    setMode('signin');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'signin' ? t('auth.welcomeBack') : t('auth.joinAMN')}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' 
              ? t('auth.signInDescription')
              : t('auth.signUpDescription')
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.fullName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="أحمد محمد"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="ahmed@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {mode === 'signin' && (
            <div className="text-sm text-muted-foreground">
              {t('auth.demoCredentials')}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full trust-gradient hover:opacity-90"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'signin' ? t('auth.signIn') : t('auth.createAccount')}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-sm text-primary hover:underline"
            >
              {mode === 'signin' 
                ? t('auth.noAccount')
                : t('auth.haveAccount')
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};