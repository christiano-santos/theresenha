import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../../models/user";
import { Request } from '../../models/Request';
import { AppPreferences } from '@ionic-native/app-preferences';
import { UserDataProvider } from '../../providers/user-data/user-data';
@Injectable()
export class ApiRequestsProvider {
  public request ;
  public req = new Request();  
  public user = new User();
  appPreferences = new AppPreferences()
  public client;
  public uid;
  public token;
  //private API_URL = 'http://localhost:3000';
  private API_URL = 'http://192.168.1.5:3000';
  constructor(public http: HttpClient,
             public userData: UserDataProvider
   ) {
    console.log('Hello ApiRequestsProvider Provider');
  }
  createUser(user: User){
    return this.http.post(this.API_URL+'/auth',user, {observe:'response'}).toPromise();
  }
  loginUser(user: User){
    return this.http.post<any>(this.API_URL+'/auth/sign_in',user, {observe:'response'}).toPromise();
  }
  logoutUser(user: User){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': `${user.token}`,
        'client': `${user.client}`,
        'uid': `${user.uid}`   
      })
    };
    console.log(httpOptions)
    return this.http.delete<any>(this.API_URL+'/auth/sign_out', httpOptions).toPromise();
  }
  renameUser(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': `${user.token}`,
      'client': `${user.client}`,
      'uid': `${user.uid}`       
    })
    console.log("headers")
    console.log(headers)
    return this.http.patch<any>(this.API_URL+'/auth', user,{headers,  observe: 'response'}).toPromise();
  }
  changePassword(user: User) {    
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'access-token': `${user.token}`,
        'client': `${user.client}`,
        'uid': `${user.uid}`         
      })
    console.log("headers")
    console.log(headers)
    return this.http.patch<any>(this.API_URL+'/auth/password', user, {headers, observe: 'response'}).toPromise();
  }
  changePhoto(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': `${user.token}`,
      'client': `${user.client}`,
      'uid': `${user.uid}`       
    })
   return this.http.patch<any>(this.API_URL+'/users/'+user.id,user, {headers, observe:'response'}).toPromise();
  }
  getPhoto(user:User) { 
    return this.http.get('http://localhost:3000/users/'+`${user.id}`, { observe: 'response'}).toPromise();
  }
  getAds(user, page){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': `${user.token}`,
      'client': `${user.client}`,
      'uid': `${user.uid}`       
    })
    return this.http.get(this.API_URL+'/ads?page='+`${page}`, {headers, observe: 'response'}).toPromise();
  }
  getShows(user, page){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': `${user.token}`,
      'client': `${user.client}`,
      'uid': `${user.uid}`
    })
    return this.http.get(this.API_URL+'/ads/shows?page='+`${page}`, {headers, observe: 'response'}).toPromise();
  }
  getRestaurante(user, page){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': `${user.token}`,
      'client': `${user.client}`,
      'uid': `${user.uid}`
    })
    return this.http.get(this.API_URL+'/ads/restaurante?page='+`${page}`, {headers, observe: 'response'}).toPromise();
  }
  getBar(user, page){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': `${user.token}`,
      'client': `${user.client}`,
      'uid': `${user.uid}`
    })
    return this.http.get(this.API_URL+'/ads/bar?page='+`${page}`, {headers, observe: 'response'}).toPromise();
  }
}







