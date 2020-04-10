import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";
import {NavigationExtras, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import swal from "sweetalert2";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  AllProductsHomePage: any;

  joinId : any = '';
  constructor(
    private socialSharing: SocialSharing,
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    public router: Router,
    public httpClient: HttpClient
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
    formData.append("user_id",localStorage.getItem("id"));
    this.httpClient.post("https://www.alphawizz.com/bsletsplay/Api/Activity/getactivity",formData).subscribe(data => {
      if (data) {
        console.log('data====',data);
        console.log('joindata====',data['join_data'][0]['id']);
        this.joinId = data['join_data'][0]['id'];
        this.AllProductsHomePage=data['data'] }
       else {
       
      }
    })
  }

  withdrawEvent() {
        const formData = new FormData();
        formData.append('activity_id', localStorage.getItem("activity_id"));
        formData.append('user_id', localStorage.getItem("id"));
        formData.append('join_id', this.joinId);

        this.showLoader();
        this.httpClient.post('https://alphawizz.com/bsletsplay/Api/Activity/withdrawActivity', formData).subscribe(data => {
              if (data) {
                console.log('success : ', data)
                this.loadingCtrl.dismiss();
                this.success('Withdraw data successfully');
                this.router.navigate(['/activity-join']);
              }
            },
            error => {
              this.loadingCtrl.dismiss();
              swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
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
