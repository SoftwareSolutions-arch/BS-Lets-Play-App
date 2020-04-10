import { MenuController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import { FormControl } from "@angular/forms";
import { ToastController } from "@ionic/angular";
// import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  emailvaild: boolean = false;
  passwordvaild: boolean = false;
  private users = {
    password: "",
    email: ""
  };
  constructor(
    // public fb : Facebook,
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    public router: Router,
    public httpClient: HttpClient
  ) {}

  ngOnInit() {}
  
  googleLogin(){

  }

  fbLogin() {
    // console.log('fb login !!!');
    // this.fb.login(['public_profile', 'user_friends', 'email'])
    //     .then((res: FacebookLoginResponse) => {
    //       console.log('Logged into Facebook!', res)
    //       // this.onLoginSuccess(res);
    //     })
    //     .catch(e => console.log('Error logging into Facebook', e));


    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  emailclick() {
    this.emailvaild = true;
    this.passwordvaild = false;
  }

  passwordclick() {
    this.passwordvaild = true;
    this.emailvaild = false;
  }

  onSignIn() {
    if (this.users.email == "" && this.users.password == "") {
      this.toastClickmailpassword();
    } else if (this.users.email == "") {
      this.toastClickemail();
    } else if (this.users.password == "") {
      this.toastClickpassword();
    }

    if (this.users.email!= "" && this.users.password != "") {
      let postData = {
        email: this.users.email,
        password: this.users.password,
        login_type: "1",
        firebase_token:
          "f7GEYQJqTBCSeo-KWKPCRd:APA91bHl-Z3ZU_lHWsC1MkJdkK4KflAyaWLn1H1EKH5rib79xQ6Gyqhq7LAi2Apnbf0h59fMMGBvSyF-yuIsyhRmk1fK7gvcQuu3sHK0c6LwEVohtx18zGXnZ23ilkiYzn85xOWeQBrK"
      };
      this.handleButtonClick();
      this.httpClient.post("https://alphawizz.com/bsletsplay/Api/Authentication/login", postData).subscribe(data => {
            if (data) {
              console.log('login response ===', data);
              localStorage.setItem('id',data["data"]["id"]);
              localStorage.setItem('first_name',data["data"]["first_name"]);
              localStorage.setItem('last_name',data["data"]["last_name"]);
              localStorage.setItem('email',data["data"]["email"]);
              localStorage.setItem('phone_number',data["data"]["phone_number"]);
              localStorage.setItem('country',data["data"]["Country"]);
              localStorage.setItem('photo',data["data"]["image"]);
              this.loadingCtrl.dismiss();
              this.menuCtrl.enable(true);
              this.toastClick();
              this.router.navigate(["/dashboard"]);
            }
          },
          error => {
            this.toastClickfail();
            this.loadingCtrl.dismiss();
            console.log(error);
          }
        );
    }
  }

  async handleButtonClick() {
    const loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: "Please wait...",
      // duration: 1000
    });
    await loading.present();
  }

  ionViewWillEnter() {
    this.users.email='',
    this.users.password='',
    this.menuCtrl.enable(false);
    localStorage.clear();
  }

  sidebarmenu() {
    this.menuCtrl.enable(true);
  }

  loginForm = this.formBuilder.group({
    password: [
      "",
      [Validators.required, Validators.maxLength(12), Validators.minLength(4)]
    ],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")
      ]
    ]
  });

  async toastClick() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "Login Successfully"
    });
    await toast.present();
  }

  async toastClickemail() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "input mail"
    });
    await toast.present();
  }

  async toastClickmailpassword() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "input email and password"
    });
    await toast.present();
  }

  async toastClickpassword() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "input password"
    });
    await toast.present();
  }

  async toastClickfail() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "Invalid email or password"
    });
    await toast.present();
  }
  postData() {}
}
