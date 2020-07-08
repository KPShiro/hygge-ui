export const environment = {
  production: false,
  api: {
    v2: {
      url: 'http://localhost:3000',
      auth: {
        url: '/auth',
        endpoints: {
          login: '/login',
          logout: '/logout',
          token: '/token',
        },
      },
      organization: {
        url: '/organization',
        endpoints: {
          create: '/create',
          delete: '/delete',
          getEmployees: '/employees',
          getInvitations: '/invitations',
          invite: '/invite',
          deleteInvitation: '/invite/delete',
          verifyInvitation: '/invite/verify',
        },
      },
      account: {
        url: '/account',
        endpoints: {
          create: '/create',
          delete: '/delete',
          verifyUsername: '/verify/username',
        },
      },
    },
  },
};