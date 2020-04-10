import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListparticipantsPage } from './listparticipants.page';

const routes: Routes = [
  {
    path: '',
    component: ListparticipantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListparticipantsPageRoutingModule {}
