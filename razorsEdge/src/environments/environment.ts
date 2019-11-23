// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Urls: {
    // activityApiUrl: 'http://localhost:4200/api/activity/',
    trainingLogAPIActivities: 'http://localhost/TrainingLogAPI/api/activity/',
    trainingLogAPIEvents: 'http://localhost/TrainingLogAPI/api/event/',
    // inMemoryActivityApiUrl: 'api/'
  }
};
