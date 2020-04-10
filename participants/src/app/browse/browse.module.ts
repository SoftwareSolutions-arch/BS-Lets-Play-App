import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BrowsePageRoutingModule } from "./browse-routing.module";

import { BrowsePage } from "./browse.page";
import { SidebarPageModule } from "../sidebar/sidebar.module";
// import { HeaderPageModule } from '../header/header.module';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "tabs",
    component: BrowsePage,
    children: [
      {
        path: "tabs",
        outlet: "tabs",
        loadChildren: () => import("./browse.page").then(m => m.BrowsePage)
      }
    ]
  }
];

// const routes:Routes

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowsePageRoutingModule,
    SidebarPageModule
    // HeaderPageModule
  ],
  declarations: [BrowsePage]
})
export class BrowsePageModule {}
