import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { from } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';

// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from '@angular/fire';
// import { Facebook } from '@ionic-native/facebook/ngx';
import { environment } from '../environments/environment';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    // AngularFireModule.initializeApp(environment.config),
    // AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImageResizer,
      // Facebook,
    NativeGeocoder,
    SocialSharing,  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent] 
})
export class AppModule {}
