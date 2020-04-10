import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePaasswordPageRoutingModule } from './change-paassword-routing.module';

import { ChangePaasswordPage } from './change-paassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePaasswordPageRoutingModule
  ],
  declarations: [ChangePaasswordPage]
})
export class ChangePaasswordPageModule {}
