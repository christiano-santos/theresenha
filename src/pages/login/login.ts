import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NewUserPage } from '../new-user/new-user';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { App } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[
    ApiRequestsProvider,
    UserDataProvider
  ]
})
export class LoginPage {
  public userForm;
  loginForm: FormGroup;
  user = new User();
  public load;
  private API_URL = 'http://192.168.1.5:3000';
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public apiRequestsProvider: ApiRequestsProvider,
     private toast: ToastController,
     public loadingCtrl: LoadingController,
     public useData: UserDataProvider,
     public formBuilder: FormBuilder,
     public appCtrl: App,
     private nativePageTransitions: NativePageTransitions
    ) {
      this.loginForm = this.formBuilder.group({
        email:                  ['', [ Validators.required, Validators.email]],
        password:               ['', [ Validators.required, Validators.minLength(6) ]],
    });
  }


  ionViewDidEnter(){
    console.log("entrando na pagina de login")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  cadastrarUser(){
    this.navCtrl.push(NewUserPage);
  }
  
  transition(){
    let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 600,
        // slowdownfactor: 3,
        // slidePixels: 20,
        // iosdelay: 100,
        // androiddelay: 150,
        // fixedPixelsTop: 0,
        // fixedPixelsBottom: 60
       };
    this.nativePageTransitions.flip(options);
  }

  presentLoading(){
    this.load = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Favor Aguarde....'
    })
    this.load.present();
  }
  noPresentLoading(){
    this.load.dismissAll();
  }
  login(){
    this.userForm = this.loginForm.value;
    this.user.email = this.userForm.email;
    this.user.password = this.userForm.password;
    this.loginForm.reset();
    this.presentLoading();
    this.apiRequestsProvider.loginUser(this.user).then((result: any)=>{
      this.toast.create({ message: 'Bem Vindo!', position: 'botton', duration: 2000 }).present();
      this.noPresentLoading();
      this.user.uid = result.headers.get('uid');
      this.user.token = result.headers.get('access-token');
      this.user.client = result.headers.get('client');
      this.user.name = result.body.data.name;
      this.user.id = result.body.data.id;
      this.user.avatar = this.API_URL+result.body.data.avatar.url;
      this.user.password = "";
      console.log(this.user);
      this.useData.save(this.user);
      this.transition();    
      this.navCtrl.setRoot(TabsPage);
    }).catch((error)=>{
      this.noPresentLoading();
      this.toast.create({message: error.error.errors[0], position: 'botton', duration: 4000}).present();
      console.log(error)
    });
  }

}
