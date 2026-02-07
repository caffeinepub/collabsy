import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, clear, login, isLoggingIn } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleDashboardClick = () => {
    if (userProfile?.role === 'brand') {
      navigate({ to: '/brand-dashboard' });
    } else if (userProfile?.role === 'creator') {
      navigate({ to: '/creator-dashboard' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/generated/collabsy-wordmark.dim_600x160.png"
                alt="Collabsy"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/for-brands"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              For Brands
            </Link>
            <Link
              to="/for-creators"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              For Creators
            </Link>
            {isAuthenticated && userProfile && (
              <button
                onClick={handleDashboardClick}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Dashboard
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="font-medium"
                >
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>
                <Button onClick={() => navigate({ to: '/signup' })} className="font-medium">
                  Get Started
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleAuth} className="font-medium">
                Logout
              </Button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/for-brands"
              className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Brands
            </Link>
            <Link
              to="/for-creators"
              className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Creators
            </Link>
            {isAuthenticated && userProfile && (
              <button
                onClick={() => {
                  handleDashboardClick();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Dashboard
              </button>
            )}
            <div className="flex flex-col space-y-2 pt-4">
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleAuth();
                      setMobileMenuOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full font-medium"
                  >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button
                    onClick={() => {
                      navigate({ to: '/signup' });
                      setMobileMenuOpen(false);
                    }}
                    className="w-full font-medium"
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full font-medium"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
