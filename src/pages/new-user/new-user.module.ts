import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUserPage } from './new-user';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NewUserPage
  ],
  imports: [
    IonicPageModule.forChild(NewUserPage),
    HttpClientModule
  ],
})
export class NewUserPageModule {}
