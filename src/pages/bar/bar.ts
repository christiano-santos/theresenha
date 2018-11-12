import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-bar',
  templateUrl: 'bar.html',
  providers: [
    ApiRequestsProvider,
    UserDataProvider
  ]
})
export class BarPage {
  public user = new User();
  public lista_anuncios = new Array<any>();
  public API_URL = 'http://localhost:3000';
  public load;
  public page = 1;
  public infinitescroll;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public apiProvider: ApiRequestsProvider,
     public userData: UserDataProvider,
     public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    console.log("Chamando Pega Anuncio")
    this.pegaAnuncio()
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infinitescroll = infiniteScroll;
    this.pegaAnuncio(true);
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

  pegaAnuncio(novaPagina: boolean = false){
    
    this.presentLoading();
    this.userData.get().then(user=>{
      this.user = user
      this.apiProvider.getBar(this.user, this.page).then((result: any) => {
        if (novaPagina) {
          this.lista_anuncios = this.lista_anuncios.concat(result.body);
          this.infinitescroll.complete();
        }else{
          this.lista_anuncios = result.body; 
        }
        this.user.token = result.headers.get('access-token');
        this.userData.save(this.user);
        console.log(this.lista_anuncios)
        this.noPresentLoading();
      }).catch(err =>{
        this.noPresentLoading();
        console.log(err)
      });
     }).catch(err=>{
       this.noPresentLoading();
       console.log(err)
     })
    
  }
}
