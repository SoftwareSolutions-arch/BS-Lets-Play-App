import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-activity-join',
  templateUrl: './activity-join.page.html',
  styleUrls: ['./activity-join.page.scss'],
})
export class ActivityJoinPage implements OnInit {
  AllProductsHomePage: any;
  constructor(
    private socialSharing: SocialSharing,
    public toastController: ToastController,
    public httpClient: HttpClient,private loadingCtrl: LoadingController,private router: Router,
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getactivitybyid();
  }

  getactivitybyid(){
    let data=localStorage.getItem("join_activity_id")
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


  joinactivity(item){
    let formData = new FormData();
    formData.append("activity_id",item.activity_id);
    formData.append("user_id",localStorage.getItem('id'));
    formData.append("join_status",'1');
    formData.append('first_name',localStorage.getItem('first_name'));
    formData.append('email',localStorage.getItem('email'));
    formData.append('phone_number',localStorage.getItem('phone_number'));
    this.handleButtonClick();
    this.httpClient.post("https://alphawizz.com/bsletsplay/Api/Activity/JoinActivity",formData).subscribe(data => {
          if (data) {
            console.log('join response ===', data);
             this.loadingCtrl.dismiss();
             if(data['status']){
              swal.fire({
                icon: "success",
                title: "Activity",
                text: "Event joined Successfully"
              });
              this.router.navigate(["/dashboard"]);
             }else {
               this.success(data['message'])
             }
            
            
          } else {
            swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
            this.router.navigate(["/dashboard"]);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  async success(msg) {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: msg
    });
    await toast.present();
  }

  async handleButtonClick() {
    const loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: "Please wait...",
    });
    await loading.present();
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
