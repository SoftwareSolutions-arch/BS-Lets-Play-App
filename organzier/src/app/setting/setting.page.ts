import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  id: string = '';

  constructor( public httpClient: HttpClient,private router: Router ,  private socialSharing: SocialSharing,
    ) { }

  ngOnInit() {
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

  delteAccount(){
    this.id= localStorage.getItem('id');
    console.log("id++++++++++++",this.id)
    let formData = new FormData();
    formData.append("user_id",this.id);
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
        this.httpClient.post("https://www.alphawizz.com/bsletsplay/Api/Authentication/deleteUser",formData).subscribe(data => {
          if (data) {
            swal.fire(
              'Deleted!',
              'Your Account has been deleted.',
              'success'
            )
            this.router.navigate(["/login"]);
          }
        })
      }
    });
  }


  privacypolicy(){
    console.log("hello privacy  ")
    this.router.navigate(["/privacy-policy"]);
  }
  contact(){
    this.router.navigate(["/contact-us"]);
  }
  terms(){
    this.router.navigate(["/terms-and-condition"]);
  }
}
