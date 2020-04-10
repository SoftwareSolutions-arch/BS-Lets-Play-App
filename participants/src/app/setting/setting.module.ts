import { NgModule,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { SidebarPageModule } from "../sidebar/sidebar.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule,
    SidebarPageModule
  ],
  declarations: [SettingPage]
})
export class SettingPageModule implements OnInit {

  Title:any
  ngOnInit() {
    this.Title="Setting";
  }
}
