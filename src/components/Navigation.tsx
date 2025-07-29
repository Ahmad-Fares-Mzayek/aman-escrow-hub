import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Moon, Sun, Settings, LogOut, BookOpen, ShoppingCart, DollarSign, User, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

export const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (mode: 'signin' | 'signup' = 'signin') => {
    if (!user) {
      setAuthMode(mode);
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient-primary">AMN</span>
              <span className="text-xs text-muted-foreground">أمن</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link 
                  to="/buy" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive('/buy') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                   <span>{t('nav.buy')}</span>
                </Link>
                <Link 
                  to="/sell" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive('/sell') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                   <span>{t('nav.sell')}</span>
                </Link>
                <Link 
                  to="/payments" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive('/payments') 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                   <span>{t('nav.payments')}</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <LanguageToggle />
            
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User menu or auth buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Seller ID: {user.sellerId}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t('nav.accountSettings')}</span>
                  </DropdownMenuItem>
                  {!user.isOnboarded && (
                    <DropdownMenuItem asChild>
                      <Link to="/tutorial">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>{t('nav.tutorial')}</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('nav.signOut')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                 <Button 
                  variant="ghost" 
                  onClick={() => handleAuthClick('signin')}
                  className="hidden sm:inline-flex"
                >
                  {t('nav.signIn')}
                </Button>
                 <Button 
                  onClick={() => handleAuthClick('signin')}
                  className="bg-primary hover:bg-primary-light"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t('nav.getStarted')}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        {user && (
          <div className="md:hidden border-t bg-background">
            <nav className="flex items-center justify-around py-2">
              <Link 
                to="/buy" 
                className={`flex flex-col items-center p-2 text-xs ${
                  isActive('/buy') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span>{t('nav.buy')}</span>
              </Link>
              <Link 
                to="/sell" 
                className={`flex flex-col items-center p-2 text-xs ${
                  isActive('/sell') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <DollarSign className="h-5 w-5 mb-1" />
                <span>{t('nav.sell')}</span>
              </Link>
              <Link 
                to="/payments" 
                className={`flex flex-col items-center p-2 text-xs ${
                  isActive('/payments') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <DollarSign className="h-5 w-5 mb-1" />
                <span>{t('nav.payments')}</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
};