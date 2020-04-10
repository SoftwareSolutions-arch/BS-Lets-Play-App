import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityJoinPage } from './activity-join.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityJoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityJoinPageRoutingModule {}
