import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import swal from "sweetalert2";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  subscribe: any;
  AllProductsHomePage: any
  thispageloaded: boolean = false;
  firstName: string;
  email: string;
  phone_number: string;

  constructor(
    private socialSharing: SocialSharing,
    private loadingCtrl: LoadingController,
    public httpClient: HttpClient,
    private platform: Platform,
    private router: Router,
    public navCtrl: NavController,
    private menu: MenuController,
  ) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (window.location.pathname == "/dashboard") {
        if (window.confirm("do you want to exit from app")) {
          navigator["app"].exitApp();
        }
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  Dashbaord() {
    this.menu.toggle();
  }


  ngOnInit() {
    // this.getdetails();
  }

  ionViewWillEnter() {
    this.getdetails();
    this.getprofile();
  }

  getdetails() {
    this.httpClient.get("https://www.alphawizz.com/bsletsplay/Api/Activity/getallactivity").subscribe(data => {
      if (data) {
        this.AllProductsHomePage = data['data'];
        this.thispageloaded = true;
        console.log(this.AllProductsHomePage, "data")
        // this.router.navigate(["/dashboard"]);
      }
      //  else {
      //   this.router.navigate(["/dashboard"]);
      // }
    },
      error => {
        console.log(error);
      });
  }

  deleteactivity(item) {
    let formData = new FormData();
    formData.append("activity_id", item.activity_id);
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.handleButtonClick();
        this.httpClient.post("https://www.alphawizz.com/bsletsplay/Api/Activity/delete_activity", formData).subscribe(data => {
          if (data) {
            this.ionViewWillEnter();
            this.loadingCtrl.dismiss();
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            // this.ionViewWillEnter();
          }
        })
      }
    });
  }

  async handleButtonClick() {
    const loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: "Please wait...",
      // duration: 1000
    });
    await loading.present();
  }

  getactivitybyid(item) {
    localStorage.setItem("activity_id", item.activity_id)
    this.router.navigate(["/activity-detail"]);
  }

  editactivity(item) {
    localStorage.setItem("id", item.activity_id);
    this.router.navigate(["/edit-activity"]);
  }

  getprofile() {
    this.firstName = localStorage.getItem('first_name');
    this.email = localStorage.getItem('email');
    this.phone_number = localStorage.getItem('phone_number');
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
