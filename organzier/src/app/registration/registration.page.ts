import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { FormBuilder,FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";


@Component({
  selector: "app-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"]
})
export class RegistrationPage implements OnInit {
  loginForm: FormGroup;
  error_messages = {
    name: [{ type: "required", message: "Name is required." }],

    mobile_number: [
      { type: "required", message: "Mobile Number  is required." },
      { type: "minlength", message: "minimun length should be 10 ." },
      { type: "maxlength", message: "maximum length should be 12 ." }
    ],

    email: [
      { type: "required", message: "Email is required." },
      // { type: 'minlength', message: 'Email length.' },
      // { type: 'maxlength', message: 'Email length.' },
      { type: "pattern", message: "please enter a valid email address." }
    ],

    password: [
      { type: "required", message: "password is required." },
      { type: "minlength", message: "minimum password length should be 6." },
      { type: "maxlength", message: "maximum password length should be 8." }
    ],
    confirmpassword: [
      { type: "required", message: "password is required." },
      { type: "minlength", message: "minimum password length should be 6." },
      { type: "maxlength", message: "maximum password length should be 8." }
    ]
  };

  namevaild: boolean = false;
  emailvaild: boolean = false;
  mobilevaild: boolean = false;
  passwordvaild: boolean = false;
  cpasswordvaild: boolean = false;
  passwordmatchvaild: boolean = false;
  passwordNotMatch:any;

  constructor(
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public router: Router,
    public httpClient: HttpClient
  ) {
    this.loginForm = this.formBuilder.group(
      {
        name: new FormControl("", Validators.compose([Validators.required])),
        mobile_number: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(12)
          ])
        ),
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            // Validators.minLength(6),
            // Validators.maxLength(30),
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(8)
          ])
        ),
        confirmpassword: new FormControl(
          "",
          Validators.compose([
            Validators.required,this.equalto('password'),
            Validators.minLength(6),
            Validators.maxLength(8)
          ])
        )
      },
      {
        validators: this.password.bind(this)
      }
    );
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    
    let input = control.value;
    
    let isValid=control.root.value[field_name]==input
    if(!isValid)
    return { 'equalTo': {isValid} }
    else
    return null;
    };
    }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get("password");
    const { value: confirmPassword } = formGroup.get("confirmpassword");
    console.log("password",password,"confirmPassword",confirmPassword)
    if(password === confirmPassword){
      this.passwordNotMatch= ""
    }else{
      this.passwordNotMatch= "password not match"
    }  
  }

  ionViewWillEnter() {
    this.loginForm.reset();
    localStorage.clear();
  }

  nameclick() {
    this.namevaild = true;
    this.emailvaild = false;
    this.mobilevaild = false;
    this.passwordvaild = false;
    this.cpasswordvaild = false;
    // this.passwordmatchvaild =false
  }

  emailclick() {
    this.namevaild = false;
    this.emailvaild = true;
    this.mobilevaild = false;
    this.passwordvaild = false;
    this.cpasswordvaild = false;
    // this.passwordmatchvaild =false

  }

  mobileclick() {
    this.namevaild = false;
    this.emailvaild = false;
    this.mobilevaild = true;
    this.passwordvaild = false;
    this.cpasswordvaild = false;
    // this.passwordmatchvaild =false

  }

  passwordclick() {
    this.namevaild = false;
    this.emailvaild = false;
    this.mobilevaild = false;
    this.passwordvaild = true;
    this.cpasswordvaild = false;
    // this.passwordmatchvaild =false
  }

  cpasswordclick() {
    this.namevaild = false;
    this.emailvaild = false;
    this.mobilevaild = false;
    this.passwordvaild = false;
    this.cpasswordvaild = true;
  }

  onRegister() {
    let system = localStorage.getItem("user");
    if (
      this.loginForm.value.password == "" ||
      this.loginForm.value.confirmpassword == "" ||
      this.loginForm.value.name == "" ||
      this.loginForm.value.mobile_number == "" ||
      this.loginForm.value.email == ""
    ) {
      this.toastClickmailpassword();
    } else if (system == "0" || system == null) {
      this.toastClickcheckbox();
    }
    
    if (
      system == "1" &&
      this.loginForm.value.email != "" &&
      this.loginForm.value.password != "" &&
      this.loginForm.value.confirmpassword != "" &&
      this.loginForm.value.name != "" &&
      this.loginForm.value.mobile_number != ""
    ) {
      let postData = {
        username: this.loginForm.value.name,
        email: this.loginForm.value.email,
        phone_number: this.loginForm.value.mobile_number,
        password: this.loginForm.value.password,
        address: this.loginForm.value.confirmpassword,
        gender: "male",
        dob: "08121995"
      };
      this.handleButtonClick();
      this.httpClient.post("https://alphawizz.com/bsletsplay/Api/Authentication/registration",postData)
        .subscribe(data => {
            let datagram= data['status']
            if(datagram==false){
              this.loadingCtrl.dismiss();
              this.mobemailcheck();
              // this.router.navigate(["/login"]);
            }
            else if(datagram==true)  {
              this.loadingCtrl.dismiss();
              this.toastClick();
              this.router.navigate(["/login"]);
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  data(event) {
    console.log(event.target.checked, "event.target.checked");
    if (event.target.checked == false) {
      localStorage.setItem("user", "1");
    } else localStorage.setItem("user", "0");
  }

  async toastClickmailpassword() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "please fill all the details"
    });
    await toast.present();
  }

  async toastClickcheckbox() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "You must agree with Terms & condition for registering."
    });
    await toast.present();
  }

  ngOnInit() {}

  menu1Active() {
    this.menu.enable(false);
  }

  // loginForm = this.formBuilder.group({
  //   name: [
  //     "",
  //     [Validators.required, Validators.maxLength(12), Validators.minLength(4)]
  //   ],
  //   password: [
  //     "",
  //     [Validators.required, Validators.maxLength(12), Validators.minLength(8)]
  //   ],
  //   confirm_password: [
  //     "",
  //     [Validators.required, Validators.maxLength(12), Validators.minLength(8)]
  //   ],
  //   email: [
  //     "",
  //     [
  //       Validators.required,
  //       Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$")
  //     ]
  //   ],
  //   mobile_number: [
  //     "",
  //     [
  //       Validators.required,
  //       Validators.maxLength(10),
  //       Validators.minLength(10),
  //       Validators.pattern("^[0-9]*$")
  //     ]
  //   ]
  // });

  async handleButtonClick() {
    const loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: "Please wait...",
      // duration: 1000
    });
    await loading.present();
  }

  async toastClick() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "Registered Successfully"
    });
    await toast.present();
  }

  async mobemailcheck() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "Duplicate mobile number or email....."
    });
    await toast.present();
  }
}
