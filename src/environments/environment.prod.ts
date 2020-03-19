export const environment = {
  production: false,
  api: {
    auth: {
      url: 'http://localhost:3000/auth',
      endpoints: {
        login: '/login',
        logout: '/logout',
        refresh: '/refresh',
      },
    },
    userAccount: {
      url: 'http://localhost:3000/user-account',
      endpoints: {
        create: '/create',
        delete: '/delete',
        isUsernameAvailable: '/username/available',
      },
    },
    companyAccount: {
      url: 'http://localhost:3000/company-account',
      endpoints: {
        create: '/create',
        delete: '/delete',
        isNameAvailable: '/company-name/available',
      },
    },
  },
};
