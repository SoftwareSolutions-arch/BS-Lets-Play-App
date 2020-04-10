import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditActivityPageRoutingModule } from './edit-activity-routing.module';
import { EditActivityPage } from './edit-activity.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditActivityPageRoutingModule
  ],
  declarations: [EditActivityPage]
})
export class EditActivityPageModule {}
