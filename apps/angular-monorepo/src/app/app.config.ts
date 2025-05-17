import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { isDevMode } from '@angular/core';
import { counterReducer } from './store/counter/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ counter: counterReducer }),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
      actionsBlocklist: ['@ngrx/store/update-reducers']
    }),
  ],
};
