export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  plan?: string;
  joinedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  token: string;
  user: User;
}
