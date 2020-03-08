export const environment = {
  production: true,
  api: {
    auth: {
      url: 'http://localhost:3000/auth',
      endpoints: {
        login: '/login',
        refresh: '/refresh',
        logout: '/logout',
        register: '/register',
      },
    },
    verify: {
      url: 'http://localhost:3000/verify',
      endpoints: {
        username: '/username',
        companyName: '/companyName',
        invitation: '/invitation',
      }
    }
  },
};
