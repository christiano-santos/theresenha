import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

@Injectable()
export class UserDataProvider {
  user = new User();
  constructor(
    public storage: Storage
  ) {
   
  }

  save(user: User): Promise<User>{
    return this.storage.set(`${user.ident}`,user);
  }

  get(): Promise<User>{
    return this.storage.get(`${this.user.ident}`); 
  }

  delete(){
    this.storage.clear();
  }

}

//fazer um get no user, savar os valores em uma instancia de user, atualizar atributos de user na instnacia e salvar a instancia atualizada de user no banco.
