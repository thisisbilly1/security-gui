import { post } from './cameraService';

class AuthService {
  constructor() {
    this.accessToken = null;
    this.isAuthenticated = false;
    this.invalidCredentials = false;
  }
  async verifyToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await post('/checkToken', { token })
        this.accessToken = token;
        this.isAuthenticated = true;
      } catch (e) {
        console.error(e);
        this.accessToken = null;
        this.isAuthenticated = false;
      }
    } else {
      this.accessToken = null;
      this.isAuthenticated = false;
    }
  }
  async login(username, password) {
    this.invalidCredentials = false;
    try {
      const resp = await post('/login', {
        username: username,
        password: password,
      })
      this.accessToken = resp.token;
      localStorage.setItem('token', this.accessToken);
      this.isAuthenticated = true;
    } catch (e) {
      console.error(e);
      this.invalidCredentials = true;
    }
  }
}

export const authService = new AuthService();