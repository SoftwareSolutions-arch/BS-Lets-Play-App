import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DashboardPageRoutingModule } from "./dashboard-routing.module";
import { DashboardPage } from "./dashboard.page";
import { SidebarPageModule } from "../sidebar/sidebar.module";
import { HeaderPageModule } from "../header/header.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SidebarPageModule,
    HeaderPageModule
  ],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class DashboardPageModule {

  asdasd(){
    alert("Asdasd");
  }
}
