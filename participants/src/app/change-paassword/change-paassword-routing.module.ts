import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePaasswordPage } from './change-paassword.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePaasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePaasswordPageRoutingModule {}
