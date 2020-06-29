// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
