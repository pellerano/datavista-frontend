import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { AppRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi  } from '@angular/common/http';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultInterpolationFormat, I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, ITranslationService } from 'angular-i18next';
import { APP_INITIALIZER, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export function appInit(i18next: ITranslationService) {
    return () => {
      let promise: Promise<I18NextLoadResult> = i18next
      .use(HttpApi)
      .use<any>(LanguageDetector)
      .init({
        supportedLngs: ['en', 'es'],
        fallbackLng: 'es',
        debug: false,
        returnEmptyString: false,
        ns: [
          'translation',       
        ],
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
        },
        backend: {
          loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
        },
      });
      return promise;
    };
}

export function localeIdFactory(i18next: ITranslationService)  {
    return i18next.language;
}

export const I18N_PROVIDERS = [
{
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
},
{
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
    useValue: 'es-ES'
}];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    provideIonicAngular(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(
      I18NextModule.forRoot()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    provideRouter(AppRoutes, withPreloading(PreloadAllModules)),
    I18N_PROVIDERS,
  ],
}).catch(err => console.error(err));
