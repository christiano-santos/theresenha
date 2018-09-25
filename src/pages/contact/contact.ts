import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { EditaUserPage } from '../edita-user/edita-user';
import { AlterarSenhaPage } from '../alterar-senha/alterar-senha';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppPreferences } from '@ionic-native/app-preferences';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { App } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
    providers:[
      UserDataProvider,
      ApiRequestsProvider
    ]
})
export class ContactPage {
  
  public user = new User();
  public load;
 
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private camera: Camera,
    public userProvider: UserDataProvider,
    public apiRequest: ApiRequestsProvider,
    private toast: ToastController,
    public appPreferences: AppPreferences,
    public userData: UserDataProvider,
    public loadingCtrl: LoadingController,
    public appCtrl: App,
    private nativePageTransitions: NativePageTransitions
    ) {

  }


  ionViewDidEnter() {
    this.userData.get().then(user => {
      this.user = user;
      console.log(user);
    }).catch((err)=>{
      console.log(err);
    });
    console.log('ionViewDidEnter Contato carregando user');
    
  }

  presentModal() {
    const modal = this.modalCtrl.create(EditaUserPage);
    modal.present();
  }

  senhaModal(){
    const modal = this.modalCtrl.create(AlterarSenhaPage);
    modal.present();
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

  cameraModal(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      allowEdit:true,
      targetHeight:250,
      targetWidth:250
    }
      
    this.camera.getPicture(options).then((imageData) => {
     this.user.avatar = 'data:image/jpeg;base64,' + imageData;
     this.auteraFoto();
     }, (err) => {
      console.log(err);
     });
     
  }

  fotoModal(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      allowEdit:true,
      targetHeight:250,
      targetWidth:250
    }
      
    this.camera.getPicture(options).then((imageData) => {
      this.user.avatar = 'data:image/jpeg;base64,' + imageData;
      this.auteraFoto();
     }, (err) => {
      console.log(err);
     });
  }

   auteraFoto(){
     this.apiRequest.changePhoto(this.user).then(res =>{
       this.toast.create({message: 'Fofto alterada!', position: 'botton', duration: 3000}).present(); 
       this.user.token = res.headers.get('access-token');
       this.userData.save(this.user);
     }).catch((err) => {
       console.log(err)
     }); 
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

  sair(){
    this.presentLoading();
    console.log(this.user);
    this.apiRequest.logoutUser(this.user).then((res)=>{
      this.toast.create({message: 'Logout...', position: 'botton', duration: 3000}).present();
      console.log(res);
      this.userData.delete();
     // this.navCtrl.push(LoginPage);
     // this.appCtrl.getRootNavs()[0];
     //this.navCtrl.setRoot(LoginPage)
     this.transition();
     this.appCtrl.getRootNav().setRoot(LoginPage);
      this.noPresentLoading();
    }).catch((error)=>{
      this.noPresentLoading();
      console.log(error);
    });
  }
}
