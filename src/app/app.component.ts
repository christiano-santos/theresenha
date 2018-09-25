import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserDataProvider } from '../providers/user-data/user-data';




@Component({
  templateUrl: 'app.html',
  providers: [
    UserDataProvider
  ]
})
export class MyApp {
  rootPage:any ;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, userData: UserDataProvider) {
    
    userData.get().then(user =>{
      if(user){
        this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }
    }).catch((err)=>{
      console.log(err);
    });
    
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

    }).catch((err) =>{
      console.log(err);
    });
  }
}
