import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { SidebarPageModule } from '../sidebar/sidebar.module';
import { HeaderPageModule } from '../header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    SidebarPageModule,
    HeaderPageModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
