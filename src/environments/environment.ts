// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiURL: 'http://143.110.244.51:8189/',
  apiURL: 'http://127.0.0.1:8000/',
  NACURL: 'http://127.0.0.1:8001/', 
  cmsapiURL: 'http://143.110.244.51:8188/',    
  // cmsapiURL: 'http://192.168.1.36:8000/', 
  apiToken:'',
  cmsToken:''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
