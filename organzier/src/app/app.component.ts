import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HomePage} from './home/home.page'
// import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private socialSharing: SocialSharing,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // AngularFireModule.initializeApp(environment.config)
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
}
