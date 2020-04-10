import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListparticipantsPageRoutingModule } from './listparticipants-routing.module';

import { ListparticipantsPage } from './listparticipants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListparticipantsPageRoutingModule
  ],
  declarations: [ListparticipantsPage]
})
export class ListparticipantsPageModule {}
