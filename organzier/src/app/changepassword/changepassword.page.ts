import { Component, OnInit } from "@angular/core";
import { MenuController, ToastController, LoadingController } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  oldPswd: any = '';
  newPswd: any = '';
  reEnterPswd: any = '';
  id: any = '';

  constructor(public menuCtrl: MenuController,
    public toastController: ToastController,
    public router: Router,
              private loadingCtrl: LoadingController,
              public httpClient: HttpClient) {
                this.id = localStorage.getItem('id');
                console.log('id is =======', this.id);
              }

  ngOnInit() {}

  submitPassword() {
    if (this.oldPswd === '') {
      this.validate('Please enter old password')
      return;
    } 
    if (this.newPswd === '') {
      this.validate('Please enter new password')
      return;
    }
    if (this.reEnterPswd === '') {
      this.validate('Please re-enter new password')
      return;
    }
    if (this.reEnterPswd !== this.newPswd) {
      this.validate('New password and re-enter password must be same')
      return;
    }
        const formData = new FormData();
        formData.append('id', this.id);
        formData.append('password', this.newPswd);
        formData.append('old_pass', this.oldPswd);
        this.showLoader();
        this.httpClient.post('http://alphawizz.com/bsletsplay/Api/Authentication/changePassword', formData).subscribe(data => {
              if (data) {
                console.log('success : ', data)
                this.loadingCtrl.dismiss();
                this.success('Password changed successfully');
                this.router.navigate(['/login']);
                }
            },
            error => {
              this.loadingCtrl.dismiss();
              // this.validate('This Email is not registered with this application');
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
  async success(msg) {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: msg
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

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
