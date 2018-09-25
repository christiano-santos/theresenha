import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { User} from './../../models/user';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edita-user',
  templateUrl: 'edita-user.html',
  providers: [
    ApiRequestsProvider,
    UserDataProvider
  ]
})
export class EditaUserPage {
  public userForm;
  editaForm: FormGroup;
  public user = new User();
  public load;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public apiRequest: ApiRequestsProvider,
    public userData: UserDataProvider,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
   ) {
    this.editaForm = this.formBuilder.group({
     name:     ['', [ Validators.required, Validators.minLength(3) ]],
     password: ['', [ Validators.required, Validators.minLength(6) ]]
      
  });
  }

  ionViewDidEnter() {
    this.userData.get().then(user =>{
      this.user = user;
      console.log(user);
    }).catch((err)=>{
      console.log(err);
    });
    console.log('ionViewDidEnter EditaUserPage carregando user edita');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaUserPage');
   
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

  renomear(){
    this.userForm = this.editaForm.value; 
    this.user.name = this.userForm.name;
    this.user.current_password = this.userForm.password;
    this.editaForm.reset();
    this.presentLoading();
    this.apiRequest.renameUser(this.user).then(res =>{
      this.toast.create({message: "Alterado com Sucesso!", position: "botton", duration: 2000 }).present();
      console.log(res);
      this.user.token = res.headers.get('access-token');
      this.user.current_password = "";
      console.log(this.user);
      this.userData.save(this.user);
      this.noPresentLoading();
      this.navCtrl.setRoot(TabsPage);
    }).catch((err) =>{
      console.log(err);
      this.noPresentLoading();
       this.user.token = err.headers.get('access-token');
       console.log(this.user);
       this.userData.save(this.user);
       this.toast.create({ message: "Senha inválida" , position: 'botton', duration: 4000 }).present();
       
    });
  }

  fechar(){
    this.viewCtrl.dismiss();
  }

}
