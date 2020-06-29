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
      url: 'http://localhost:3000/user',
      endpoints: {
        create: '/create',
        delete: '/delete',
        deleteForever: '/deleteForever',
        check: {
          username: '/check/username'
        }
      },
    },
    companyAccount: {
      url: 'http://localhost:3000/company-account',
      endpoints: {
        create: '/create',
        delete: '/delete',
        isNameAvailable: '/company-name/available',
        employees: '/employees',
        invitation: {
          create: '/invitation/create',
          delete: '/invitation/delete',
          validate: '/invitation/validate',
          details: '/invitation/details',
          list: '/invitation/list'
        }
      },
    },
  },
};