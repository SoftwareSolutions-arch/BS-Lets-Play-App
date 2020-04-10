import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
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
    });
  }
  ngOnInit(){}

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
