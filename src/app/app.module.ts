import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { NewUserPageModule } from '../pages/new-user/new-user.module';
import { EditaUserPageModule } from '../pages/edita-user/edita-user.module';
import { AlterarSenhaPageModule } from '../pages/alterar-senha/alterar-senha.module';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';
import { UserDataProvider } from '../providers/user-data/user-data';
import { ApiRequestsProvider } from '../providers/api-requests/api-requests';
import { AppPreferences } from '@ionic-native/app-preferences';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Globalization } from '@ionic-native/globalization';
import { TranslateModule, TranslateLoader, TranslateService} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { Platform } from 'ionic-angular';
import { BarPage } from '../pages/bar/bar';
import { RestaurantePage } from '../pages/restaurante/restaurante';
import { ShowsPage } from '../pages/shows/shows';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

export const DEFAULT_LANGUAGE = 'pt-br';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BarPage,
    RestaurantePage,
    ShowsPage
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    NewUserPageModule,
    EditaUserPageModule,
    AlterarSenhaPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__localuser',
      storeName: 'user',
      driverOrder: ['sqlite', 'indexeddb', 'webswl', 'localstorage']
    })
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BarPage,
    RestaurantePage,
    ShowsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotoLibrary,
    Camera,
    UserDataProvider,
    ApiRequestsProvider,
    AppPreferences,
    NativePageTransitions
    
 
  ]
})
export class AppModule {
  constructor(platform: Platform, translate: TranslateService, private globalization: Globalization) {

    platform.ready().then( () => {

        translate.setDefaultLang(DEFAULT_LANGUAGE);

        if ((<any>window).cordova) {
            this.globalization.getPreferredLanguage().then( result => {
                translate.use(result.value.toLowerCase());
            });
        } else {
            let browserLanguage = translate.getBrowserLang() || DEFAULT_LANGUAGE;
            translate.use(browserLanguage.toLowerCase());
        }

    });

}
}
