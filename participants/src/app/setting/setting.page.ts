import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  Title:any;
  id: string = '';
  constructor(public httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
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
