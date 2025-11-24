const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5052';

export const AuthService = {
  login: async (userName, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
          isLoginDashboard: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await response.json();
      console.log('Response del login:', data); // Para debug
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  },
};
