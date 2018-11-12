import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
  providers:[
    ApiRequestsProvider
  ]
})
export class NewUserPage {
  public userForm;
  createForm: FormGroup;
  user = new User();
  public load;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private apiRequestsProvider: ApiRequestsProvider,
     private toast: ToastController,
     public loadingCtrl: LoadingController,
     public formBuilder: FormBuilder 
     ) {
      this.createForm = this.formBuilder.group({
        email:                  ['', [ Validators.required, Validators.email]],
        name:                   ['', [ Validators.required, Validators.minLength(3) ]],
        password:               ['', [ Validators.required, Validators.minLength(6) ]],
        password_confirmation:  ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
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
  criaUsuario(){
    this.user = this.createForm.value
    this.createForm.reset();
    console.log(this.user);
    this.presentLoading();
    this.apiRequestsProvider.createUser(this.user).then((result: any)=>{
      this.toast.create({ message: 'Usuário criado com sucesso!', position: 'botton', duration: 3000 }).present();
      console.log(result);
      this.noPresentLoading();
      this.navCtrl.pop();
    }).catch((error: any)=>{
      console.log(error);
      this.noPresentLoading();
      this.toast.create({ message: 'Erro ao criar o usuário. ' + error.error.errors[0], position: 'botton', duration: 4000 }).present();
    });
    
     
   }
}
