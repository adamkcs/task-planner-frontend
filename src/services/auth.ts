import api from "./api";

// Register a new user
export const register = async (userData: { email: string; password: string; username: string }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error;
    }
  };

// Get the current user session
export const getSession = async () => {
    const response = await api.get("/auth/session");
    return response.data;
};

// Logout user
export const logout = async () => {
    await api.post("/auth/logout");
};
