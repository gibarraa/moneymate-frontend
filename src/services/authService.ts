import { apiRequest } from "@/services/api";
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

const DEMO_USER_KEY = "moneymate_demo_user";

const createDemoSession = (user: User): AuthSession => ({
  token: `moneymate-demo-${user.id}`,
  user,
});

const persistUser = (user: User) => {
  window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
};

const readPersistedUser = () => {
  const stored = window.localStorage.getItem(DEMO_USER_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

export const authService = {
  async login(payload: LoginPayload) {
    try {
      return await apiRequest<AuthSession>("/auth/login", {
        method: "POST",
        body: payload,
      });
    } catch {
      const user =
        readPersistedUser() ??
        ({
          id: "demo-user",
          name: "Alex Money",
          email: payload.email,
          role: "Owner",
          plan: "Premium",
          joinedAt: new Date().toISOString(),
        } satisfies User);

      persistUser(user);
      return createDemoSession(user);
    }
  },

  async register(payload: RegisterPayload) {
    try {
      return await apiRequest<AuthSession>("/auth/register", {
        method: "POST",
        body: payload,
      });
    } catch {
      const user: User = {
        id: crypto.randomUUID(),
        name: payload.name,
        email: payload.email,
        role: "Owner",
        plan: "Premium",
        joinedAt: new Date().toISOString(),
      };

      persistUser(user);
      return createDemoSession(user);
    }
  },

  async getCurrentUser(token: string) {
    try {
      return await apiRequest<User>("/auth/me", { token });
    } catch {
      return readPersistedUser();
    }
  },
};
