import { clearLocalStorage } from "./utilities/local-storage-manager";

interface AuthProvider {
  isAuthenticated: boolean;
  id: string;
  email: string;
  signout(): void;
}

export const AuthProviderSesion: AuthProvider = {
  isAuthenticated: false,
  id: "",
  email: "",
  signout() {
    clearLocalStorage();
  },
};
