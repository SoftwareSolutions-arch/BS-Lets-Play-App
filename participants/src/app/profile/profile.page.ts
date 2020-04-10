import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {NavigationExtras} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoadingController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentImage: string = '';
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  country: string = '';
  phone_number: string = '';
  baseString : string = 'data:image/png;base64,';

  constructor(public httpClient: HttpClient,
              public toastController: ToastController,
              private loadingCtrl: LoadingController,
      private camera: Camera) { }
  getprofile(){
    this.id= localStorage.getItem('id');
    this.firstName= localStorage.getItem('first_name');
    this.lastName= localStorage.getItem('last_name');
    this.email= localStorage.getItem('email');
    this.phone_number= localStorage.getItem('phone_number');
    this.country= localStorage.getItem('country');
    this.currentImage= localStorage.getItem('photo');
    if(this.currentImage !== ''){
      // console.log('image ===',this.currentImage)
      this.baseString = '';
      this.currentImage = 'http://alphawizz.com/bsletsplay/'+ this.currentImage.slice(2);
      console.log('after image ===',this.currentImage)
    }
    // console.log(this.id, this.firstName, this.email, this.phone_number, this.country, this.lastName);
  }

  setprofile(data){
    console.log(data.all_activities.image);
    localStorage.setItem('id', this.id);
    localStorage.setItem('first_name', this.firstName);
    localStorage.setItem('last_name', this.lastName);
    localStorage.setItem('email', this.email);
    localStorage.setItem('phone_number', this.phone_number);
    localStorage.setItem('country', this.country);
    localStorage.setItem('photo', data.all_activities.image);
  }

  getImageFromCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage =  imageData;
      console.log('imageData####', imageData);
    }, (err) => {
      // Handle error
      console.log('Camera issue:' + err);
    });
  }


  updateData(){
    if (this.firstName.trim() === ''){
      this.validate('Please enter First Name');
      return;
    }
    if (this.lastName.trim() === ''){
      this.validate('Please enter Last Name');
      return;
    }
    if (this.email.trim() === ''){
      this.validate('Please enter email');
      return;
    }
    if (this.country.trim() === ''){
      this.validate('Please enter country');
      return;
    }
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.email.trim())) {
      this.validate('Please enter correct email ID');
      return;
    }
    console.log('id ---',this.id, 'first name ----',this.firstName, 'email ----', this.email, 'country ----',this.country, ' last name ------', this.lastName);

    const formData = new FormData();
    formData.append('profile_id', this.id);
    formData.append('email', this.email);
    formData.append('first_name', this.firstName);
    formData.append('last_name', this.lastName);
    formData.append('country', this.country);
    formData.append('photo', 'data:image/png;base64,' + this.currentImage);

    this.showLoader();
    this.httpClient.post('http://alphawizz.com/bsletsplay/Api/Authentication/editProfile', formData).subscribe(data => {
          if (data) {
            console.log('success : ', data)
            this.loadingCtrl.dismiss();
            this.setprofile(data);
            this.success('Profile updated successfully');
          }
        },
        error => {
          this.loadingCtrl.dismiss();
          // this.validate('This Email is not registered with this application');
          console.log('ERROR : ', error);
        }
    );
  }
  ngOnInit() {
    this.getprofile()
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
      position:'top',
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
}
