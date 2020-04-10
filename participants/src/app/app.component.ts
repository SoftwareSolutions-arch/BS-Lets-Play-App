import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HomePage} from './home/home.page'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  currentImage: string = '';

  constructor(
    private socialSharing: SocialSharing,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.firstName= localStorage.getItem('first_name');
    console.log( " this.firstName",this.firstName);
    this.lastName= localStorage.getItem('last_name');
    this.email= localStorage.getItem('email');
    this.currentImage= localStorage.getItem('photo');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  someAction(message, subject,file, url){
    // Share via
    this.socialSharing.share('bs-lets-play-app', 'Participants App',null,'url').then((success) => {
      console.log(success,"success");
      // Success!
    }).catch((error) => {
      console.log(error,"error");
      // Error!
    });
  }

  ionViewWillEnter(){
    this.firstName= localStorage.getItem('first_name');
    console.log( " this.firstName",this.firstName);
    this.lastName= localStorage.getItem('last_name');
    this.email= localStorage.getItem('email');
  }
}
