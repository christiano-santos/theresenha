import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { User } from './../../models/user';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
  providers: [
    ApiRequestsProvider,
    UserDataProvider
  ]
 
})
export class AlterarSenhaPage {

  passwordForm: FormGroup;
  public user = new User();
  public userFront;
  public load;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiRequest: ApiRequestsProvider,
    public userData: UserDataProvider,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {

      this.passwordForm = this.formBuilder.group({
        current_password:       ['', [ Validators.required, Validators.minLength(6) ]],
        password:               ['', [ Validators.required, Validators.minLength(6) ]],
        password_confirmation:  ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }

  ionViewDidEnter() {
    this.userData.get().then(user =>{
      this.user = user;
    }).catch((err)=>{
      console.log(err);
    });
    console.log('ionViewDidEnter AlterarSenhaPage');
  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarSenhaPage');
    
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

  alteraSenha(){
    this.presentLoading();
    this.userFront = this.passwordForm.value;
    this.user.current_password = this.userFront.current_password;
    this.user.password = this.userFront.password;
    this.user.password_confirmation = this.userFront.password_confirmation;
    this.passwordForm.reset();
    console.log(this.user);
    this.apiRequest.changePassword(this.user).then(res =>{
     this.toast.create({message: "Alterada com sucesso!", position: "botton", duration: 2000}).present();
     console.log(res);
     this.user.password = "";
     this.user.password_confirmation = "";
     this.user.token = res.headers.get('access-token');
     this.userData.save(this.user);
     this.noPresentLoading();
     this.navCtrl.setRoot(TabsPage);
    }).catch((err) =>{
      this.user.token = err.headers.get('access-token');
      this.userData.save(this.user);
      this.noPresentLoading();
      const result: Array<any> = err.error.errors;
      console.log(err);
      this.toast.create({ message: result["full_messages"], position: 'botton', duration: 4000 }).present();
    });
  }

  fechar(){
    this.viewCtrl.dismiss();
  }
}
