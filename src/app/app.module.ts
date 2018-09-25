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
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotoLibrary,
    Camera,
    UserDataProvider,
    ApiRequestsProvider,
    AppPreferences,
    NativePageTransitions
    
 
  ]
})
export class AppModule {}
