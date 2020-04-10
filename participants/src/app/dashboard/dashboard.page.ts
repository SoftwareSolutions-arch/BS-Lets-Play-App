import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { MenuController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import swal from "sweetalert2";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  subscribe: any;
  AllProductsHomePage: any;
  
  constructor(
    public httpClient: HttpClient,
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private router: Router,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
  ) {
    this.subscribe= this.platform.backButton.subscribeWithPriority(666666,()=>{
      if(this.router.url === '/DashboardPage' ){
        if(window.confirm("do you want to exit from app")){
          navigator["app"].exitApp();
        }
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  ionViewWillEnter(){
    this.getdetails();
  }

  openpage() {
    this.router.navigate(["/activity-detail"]);
  }

  opennotification() {
    console.log("Hello User");
    // this.router.navigate(['/notification'])
    // this.navCtrl.push('notification')
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ngOnInit() {}

  getdetails(){
    this.httpClient.get("https://www.alphawizz.com/bsletsplay/Api/Activity/getallactivity").subscribe(data => {
          if (data) {
            this.AllProductsHomePage=data['data']
            console.log(this.AllProductsHomePage,"data")
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

  deleteactivity(item){
    let formData = new FormData();
    formData.append("activity_id",item.activity_id);
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{

      if (result.value) {
        this.httpClient.post("https://www.alphawizz.com/bsletsplay/Api/Activity/delete_activity",formData).subscribe(data => {
          if (data) {
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.ionViewWillEnter();
          }
        })
      }
    });
  
}

    getactivitybyid(item){  
    localStorage.setItem("activity_id",item.activity_id)
    this.router.navigate(["/activity-detail"]);
  }

//   getactivitybyid(item){  
//     console.log(item.activity_id,"item.activity_iditem.activity_iditem.activity_id")
//  if(item.activity_id){
//   localStorage.setItem("activity_id",item.activity_id)
//       this.router.navigate(["/activity-detail"]);
//  }
//  else{
//   swal.fire({
//     icon: 'error',
//     title: 'Oops...',
//     text: 'Please participants in any app!'
//   })
//  }
// }

  joinactivitybyid(item){
    localStorage.setItem("join_activity_id",item.activity_id)
    this.router.navigate(["/activity-join"]);

  }
}