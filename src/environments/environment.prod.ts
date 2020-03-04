export const environment = {
  production: true,
  api: {
    auth: {
      url: 'http://localhost:3000',
      endpoints: {
        login: '/login',
        refresh: '/refresh',
        logout: '/logout',
        register: '/register',
      }
    }
  }
};
