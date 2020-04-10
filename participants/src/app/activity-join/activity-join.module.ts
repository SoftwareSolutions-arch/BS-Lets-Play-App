import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityJoinPageRoutingModule } from './activity-join-routing.module';

import { ActivityJoinPage } from './activity-join.page';

import { SidebarPageModule } from "../sidebar/sidebar.module";
import { HeaderPageModule } from "../header/header.module";


@NgModule({
  imports: [  
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityJoinPageRoutingModule,
    SidebarPageModule,
    HeaderPageModule
  ],
  declarations: [ActivityJoinPage]
})
export class ActivityJoinPageModule {}
