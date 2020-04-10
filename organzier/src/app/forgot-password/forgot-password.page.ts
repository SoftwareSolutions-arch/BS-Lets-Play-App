import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";
import {NavigationExtras, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  emailID = '';
  constructor(public toastController: ToastController,
              private loadingCtrl: LoadingController,
              public router: Router,
              public httpClient: HttpClient) {
    this.emailID = '';
  }

  ngOnInit() {
  }

  submitPassword() {
    if(this.emailID.trim() !== ''){
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.emailID.trim())) {
        // valid Email
        console.log('valid email');
        const formData = new FormData();
        formData.append('email', this.emailID);

        this.showLoader();
        this.httpClient.post('http://alphawizz.com/bsletsplay/Api/Authentication/ForgotPassword', formData).subscribe(data => {
              if (data) {
                console.log('success : ', data)
                this.loadingCtrl.dismiss();
                this.success();
                const navigationExtras: NavigationExtras = { state: { email: this.emailID } };
                localStorage.setItem('email', this.emailID);
                this.router.navigate(['/forgot-password-otp']);
                // this.router.navigate(['/forgot-password-otp']);
              }
            },
            error => {
              this.loadingCtrl.dismiss();
              this.validate('This Email is not registered with this application');
              console.log('ERROR : ', error);
            }
        );
      } else {
        this.validate('Please enter valid mail id')
        console.log('Invalid email !!!!');
      }
    }else {
      this.validate('Please enter your email ID');
    }

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
      message: 'Please check a verification link send to your mail id.'
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
