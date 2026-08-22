import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserData } from '../components/types';

export interface AuthError {
  type: 'auth_required' | 'user_not_registered' | 'unknown';
  message: string;
}

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  authChecked: boolean;
  authError: AuthError | null;
  logout: (shouldRedirect?: boolean) => void;
  navigateToLogin: () => void;
  checkUserAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    try {
      // TODO: Replace this block with Firebase / AWS Cognito / Custom API logic later
      // For now, a successful login is simulated to allow UI development
      
      /* EXAMPLE: Firebase integration:
      const currentUser = await firebase.auth().currentUser;
      if (currentUser) {
        setUser({ full_name: currentUser.displayName, email: currentUser.email });
        setIsAuthenticated(true);
      } else {
        throw new Error("No user found");
      }
      */

      setTimeout(() => {
        setUser({
          full_name: "Alexander Mejia",
          email: "alexander@nivelup.com"
        });
        setIsAuthenticated(true);
        setIsLoadingAuth(false);
        setAuthChecked(true);
      }, 500);

    } catch (error: any) {
      console.error('User auth check failed:', error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
      setAuthError({
        type: 'auth_required',
        message: 'Authentication required'
      });
    }
  };

  const logout = (shouldRedirect: boolean = true) => {
    setUser(null);
    setIsAuthenticated(false);
    
    // TODO: Add Firebase/Cognito logout here later
    // EXAMPLE: await firebase.auth().signOut();

    if (shouldRedirect) {
      window.location.href = '/login'; 
    }
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      authError,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};