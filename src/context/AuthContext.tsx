import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "@/services/authService";
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

const TOKEN_KEY = "moneymate_auth_token";
const USER_KEY = "moneymate_auth_user";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const persistSession = (session: AuthSession) => {
  window.localStorage.setItem(TOKEN_KEY, session.token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(session.user));
};

const clearSession = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
};

const readStoredUser = () => {
  const stored = window.localStorage.getItem(USER_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      const storedToken = window.localStorage.getItem(TOKEN_KEY);
      const storedUser = readStoredUser();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      setToken(storedToken);

      try {
        const nextUser = await authService.getCurrentUser(storedToken);
        setUser(nextUser ?? storedUser);
      } finally {
        setIsLoading(false);
      }
    };

    void boot();
  }, []);

  const login = async (payload: LoginPayload) => {
    const session = await authService.login(payload);
    persistSession(session);
    setToken(session.token);
    setUser(session.user);
  };

  const register = async (payload: RegisterPayload) => {
    const session = await authService.register(payload);
    persistSession(session);
    setToken(session.token);
    setUser(session.user);
  };

  const logout = () => {
    clearSession();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
