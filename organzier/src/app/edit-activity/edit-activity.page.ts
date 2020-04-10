import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { ToastController } from "@ionic/angular";
import swal from "sweetalert2";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {
  addActivityForm: FormGroup;
  uploadedFiles: any;
  images: any;


  constructor(
    public formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public router: Router,
    public toastController: ToastController
  ) { 
    this.addActivityForm = this.formBuilder.group({
      activityname: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      activitydetails: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      uploadimage: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      totalspots: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      freespots: new FormControl("", Validators.compose([Validators.required])),
      skilllevel: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      price: new FormControl("", Validators.compose([Validators.required])),
      startdatetime: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      enddatetime: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      location: new FormControl("", Validators.compose([Validators.required])),
      courtblocked: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      markprivate: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      postgame: new FormControl("", Validators.compose([Validators.required])),
      avatar:new FormControl('')
    });
  }

  ngOnInit() {
  }

  
  onFileChanged(event) {
    this.images = event.target.files[0];
  }

  async toastClickmailpassword() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "please fill all the details"
    });
    await toast.present();
  }

  async toastClick() {
    const toast = await this.toastController.create({
      color: "dark",
      duration: 2000,
      message: "Event created successfully"
    });
    await toast.present();
  }

  courtblocked(event) {
    if (event.target.checked == false) {
      localStorage.setItem("user", "1");
    } else localStorage.setItem("user", "0");
  }

  editForm(){
        if (
      this.addActivityForm.value.activityname == "" ||
      this.addActivityForm.value.activitydetails == "" ||
      this.addActivityForm.value.totalspots == "" ||
      this.addActivityForm.value.freespots == ""||
      this.addActivityForm.value.skilllevel == ""||
      this.addActivityForm.value.price == ""||
      this.addActivityForm.value.startdatetime == ""||
      this.addActivityForm.value.enddatetime == ""||
      this.addActivityForm.value.location == ""
    ) 
     {
      this.toastClickmailpassword();
    } 

    if (
      this.addActivityForm.value.activityname != "" &&
      this.addActivityForm.value.activitydetails != "" &&
      this.addActivityForm.value.totalspots != "" &&
      this.addActivityForm.value.freespots != "" &&
      this.addActivityForm.value.skilllevel != ""&&
      this.addActivityForm.value.price != "" &&
      this.addActivityForm.value.startdatetime != "" &&
      this.addActivityForm.value.enddatetime != "" &&
      this.addActivityForm.value.location != "" 
    ){
    let formData = new FormData();
    formData.append("activity_id",localStorage.getItem('id'));
    formData.append("activity_name",this.addActivityForm.value.activityname);
    formData.append('activity_details',this.addActivityForm.value.activitydetails);
    formData.append('total_spots',this.addActivityForm.value.totalspots);
    formData.append('free_spots',this.addActivityForm.value.freespots);
    formData.append('skill_level',this.addActivityForm.value.skilllevel);
    formData.append('price',this.addActivityForm.value.price);
    formData.append('start_datetime',this.addActivityForm.value.startdatetime);
    formData.append('end_datetime',this.addActivityForm.value.enddatetime);
    formData.append('location',this.addActivityForm.value.location);
    formData.append('court_blocked',this.addActivityForm.value.courtblocked);
    formData.append('mark_game_as_private',this.addActivityForm.value.markprivate);
    formData.append('post_game',this.addActivityForm.value.postgame);
    formData.append('photo',this.images);
    this.httpClient.post("https://alphawizz.com/bsletsplay/Api/Activity/editActivity",formData).subscribe(data => {
   if (data) {
            swal.fire({
              icon: "success",
              title: "Activity",
              text: "Activity edited  successfully"
            });
            this.router.navigate(["/dashboard"]);
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
  }
}
