import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.page.html',
  styleUrls: ['./forgot-password-otp.page.scss'],
})
export class ForgotPasswordOtpPage implements OnInit {

  otp = '';
  newPass = '';
  confirmPass = '';
  emailID = '';

  ngOnInit() {
  }
    constructor(public toastController: ToastController,
                private loadingCtrl: LoadingController,
                public router: Router,
                private route: ActivatedRoute,
                public httpClient: HttpClient) {
        this.otp = '';
        this.newPass = '';
        this.confirmPass = '';
        /*this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                console.log('into ifff =====');
                this.emailID = this.router.getCurrentNavigation().extras.state.email;            }
        });*/
        this.emailID = localStorage.getItem("email");
        console.log('email id is =====', this.emailID);
    }

    submit() {
      if (this.newPass.trim() === '') {
          this.validate('Please enter the password');
          return;
      }
      if (this.confirmPass.trim() === '') {
          this.validate('Please enter the confirm password');
          return;
      }
      if (this.newPass.trim() !== this.confirmPass.trim()) {
          this.validate('Password and Confirm Password are not matched');
          return;
      }

      const formData = new FormData();
      formData.append('email', this.emailID);
      formData.append('password', this.confirmPass);
      formData.append('otp', this.otp);

      this.showLoader();
      this.httpClient.post('http://alphawizz.com/bsletsplay/Api/Authentication/otpVarification1', formData).subscribe(data => {
                    if (data) {
                        console.log('success : ', data);
                        this.loadingCtrl.dismiss();
                        this.success();
                        this.router.navigate(['/login']);
                    }
                },
                error => {
                    this.loadingCtrl.dismiss();
                    this.validate('Something went wrong !');
                    console.log('ERROR : ', error);
                }
            );
    }
    async showLoader() {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            message: 'Please wait...',
        });
        await loading.present();
    }
    async success() {
        const toast = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: 'Password successfully updated.'
        });
        await toast.present();
    }

    async validate(msg) {
        const toast = await this.toastController.create({
            color: 'dark',
            duration: 2000,
            message: msg
        });
        await toast.present();
    }

}
