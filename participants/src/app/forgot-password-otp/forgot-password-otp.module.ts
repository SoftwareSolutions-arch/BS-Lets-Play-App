import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordOtpPageRoutingModule } from './forgot-password-otp-routing.module';

import { ForgotPasswordOtpPage } from './forgot-password-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordOtpPageRoutingModule
  ],
  declarations: [ForgotPasswordOtpPage]
})
export class ForgotPasswordOtpPageModule {}
