// utils/localStorage.ts

const TOKEN_KEY = 'token';
const USER_KEY = 'userInfo';
const AUTH_STATUS_KEY = 'auth_status';
const AUTH_MESSAGE_KEY = 'auth_message'; // new

export type AuthStatus = 'success' | 'failed' | null;

export interface UserInfo {
  id: number;
  full_name: string;
  email: string;
  avatar_url: string | null;
  code: string | null;
  gender: string | null;
  phone_number: string | null;
  roles: string[];
}

export const localStorageUtil = {
  // Token
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  // User Info
  setUser(user: UserInfo) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser(): UserInfo | null {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(USER_KEY);
      try {
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }
    return null;
  },

  removeUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  },

  // Clear all
  clearAll() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  // Kiểm tra đăng nhập
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = this.getToken();
    const user = this.getUser();
    return !!token && !!user;
  },

  // Auth Status
  // Auth Status + Message
  setAuthStatus(status: AuthStatus, message?: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STATUS_KEY, status ?? '');
      if (message) {
        localStorage.setItem(AUTH_MESSAGE_KEY, message);
      } else {
        localStorage.removeItem(AUTH_MESSAGE_KEY); // clear nếu không có message
      }
    }
  },

  getAuthStatus(): AuthStatus {
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem(AUTH_STATUS_KEY);
      if (status === 'success' || status === 'failed') return status;
    }
    return null;
  },

  getAuthMessage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_MESSAGE_KEY);
    }
    return null;
  },

  clearAuthStatus() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STATUS_KEY);
      localStorage.removeItem(AUTH_MESSAGE_KEY);
    }
  },
};
