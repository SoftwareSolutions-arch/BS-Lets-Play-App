import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
// import { DashboardPageModule} from '../dashboard/dashboard.module'
// import { SidebarPageModule} from '../sidebar/sidebar.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DashboardPageModule,
    // SidebarPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
