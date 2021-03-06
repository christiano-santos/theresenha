import { Component } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { ApiRequestsProvider } from '../../providers/api-requests/api-requests';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { User } from '../../models/user';
import { BarPage } from '../bar/bar';
import { ShowsPage } from '../shows/shows';
import { RestaurantePage } from '../restaurante/restaurante';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ApiRequestsProvider,
    UserDataProvider
  ]
})
export class HomePage {

  public user = new User();
  public lista_anuncios = new Array<any>();
  public API_URL = 'http://localhost:3000';
  public load;
  public page = 1;
  public infinitescroll;

  constructor(public navCtrl: NavController,
    public apiProvider: ApiRequestsProvider,
    public userData: UserDataProvider,
    public loadingCtrl: LoadingController,
   ) {

  }

  ionViewDidEnter(){
    console.log("Chamando Pega Anuncio")
    this.pegaAnuncio()
  }
  doInfinite(infiniteScroll) {
    this.page++;
    this.infinitescroll = infiniteScroll;
    this.pegaAnuncio(true);
  }
  pegaAnuncio(novaPagina: boolean = false){
    this.presentLoading();
    this.userData.get().then(user=>{
      this.user = user
      this.apiProvider.getAds(this.user, this.page).then((result: any) => {
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
  
  filtraBar(){
    this.navCtrl.push(BarPage);
  }

  filtraRestaurante(){
    this.navCtrl.push(RestaurantePage);
  }
  filtraShow(){
    this.navCtrl.push(ShowsPage);
   }
}
