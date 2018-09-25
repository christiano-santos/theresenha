import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaUserPage } from './edita-user';

@NgModule({
  declarations: [
    EditaUserPage,
  ],
  imports: [
    IonicPageModule.forChild(EditaUserPage),
  ],
})
export class EditaUserPageModule {}
