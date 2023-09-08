import { defineStore } from 'pinia';
import { authService } from "@/helpers/authService"

export const useRootStore = defineStore({
  id: 'root',
  state: () => ({
    authService,
    cameraServer: import.meta.env.VITE_APP_API,
  }),
  getters: {
    isAuthenticated() {
      return this.authService.isAuthenticated;
    },
    invalidCredentials() {
      return this.authService.invalidCredentials;
    },
  },
  actions: {
    verifyToken() {
      this.authService.verifyToken();
    },
    async login(username, password) {
      await this.authService.login(username, password);
    },
  },
});