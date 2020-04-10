import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {
  firstName: string;
  email: string;
  phone_number: string;

  constructor(    private socialSharing: SocialSharing,
    ) { }

  ngOnInit() {
    
  }
  Dashboard(){
    // alert("Asdasd");
  }

  
getprofile(){
  this.firstName= localStorage.getItem('first_name');
  this.email =localStorage.getItem('email');
  this.phone_number=localStorage.getItem('phone_number');
}
ionViewWillEnter(){
  this.getprofile();
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
