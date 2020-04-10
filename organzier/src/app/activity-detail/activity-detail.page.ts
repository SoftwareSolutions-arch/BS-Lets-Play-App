import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  AllProductsHomePage: any;

  constructor(    private socialSharing: SocialSharing,public httpClient: HttpClient
    ) { }

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.getactivitybyid();
  }

  getactivitybyid(){  
    let data=localStorage.getItem("activity_id")
    let formData = new FormData();
    formData.append("activity_id",data);
    this.httpClient.post("https://www.alphawizz.com/bsletsplay/Api/Activity/getactivity",formData).subscribe(data => {
      if (data) {
        console.log('data ========', data);
        this.AllProductsHomePage=data['data']
      }
       else {
      }
    })
  }

  //http://www.alphawizz.com/bsletsplay/Api/Activity/editActivity


  editactivitybyid(){  
    let data=localStorage.getItem("activity_id")
    let formData = new FormData();
    formData.append("activity_id",data);
    this.httpClient.post("https://www.alphawizz.com/bsletsplay/Api/Activity/getactivity",formData).subscribe(data => {
      if (data) {
        this.AllProductsHomePage=data['data']
      }
       else {
      }
    })
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
