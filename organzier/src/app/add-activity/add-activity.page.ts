import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import swal from 'sweetalert2';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

// import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
declare var google;
@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss']
})
export class AddActivityPage implements OnInit {
  addActivityForm: FormGroup;
  uploadedFiles: any;
  currentImage: any = '';
  capturedImage: any = '';
  imgBlob: any;
  filename: any;
  images: any;
  imgaeEntry: any = [];
  imageData: any;
  service = new google.maps.places.AutocompleteService();
  autocompleteItemsSearch: any = [];
  latitude: any = '';
  longitude: any = '';
  constructor(
    // public localStroage:Storage,
    private imageResizer: ImageResizer,
    private camera: Camera,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public zone: NgZone,
    public httpClient: HttpClient,
    public router: Router,
    public toastController: ToastController,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.addActivityForm = this.formBuilder.group({
      activityname: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      activitydetails: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      uploadimage: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      totalspots: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      freespots: new FormControl('', Validators.compose([Validators.required])),
      skilllevel: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      price: new FormControl('', Validators.compose([Validators.required])),
      startdatetime: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      enddatetime: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      location: new FormControl('', Validators.compose([Validators.required])),
      courtblocked: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      markprivate: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      postgame: new FormControl('', Validators.compose([Validators.required])),
      avatar: new FormControl('')
    });
  }

  ngOnInit() {
  }

  async handleButtonClick() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      // duration: 1000
    });
    await loading.present();
  }

  onFileChanged(event) {
    this.images = event.target.files[0];
  }

  async toastClickmailpassword() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'please fill all the details'
    });
    await toast.present();
  }

  async toastClick() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Event created successfully'
    });
    await toast.present();
  }

  courtblocked(event) {
    if (event.target.checked == false) {
      localStorage.setItem('user', '1');
    } else { localStorage.setItem('user', '0'); }
  }

  data() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {

      this.imageData = imageData;
      console.log('imageData####', imageData);

      const options = {
        uri: imageData,
        folderName: 'Protonet Messenger',
        quality: 80,
        width: 1280,
        height: 1280,
        base64: false,
        fit: false
  };
      this.imageResizer
  .resize(options)
  .then((filePath: string) => {
   console.log('FilePath', filePath);
   this.currentImage = filePath;
   const arr: any = filePath.split('/');
   this.capturedImage = (arr[arr.length - 1]);
   console.log('_this.currentImage#######@@@@@@@', this.capturedImage);

  } )
  .catch(e => console.log(e));
    }, (err) => {
      // Handle error
      console.log('Camera issue:' + err);
    });
  }

  onChangeLocation(event) {
    if (event == '') {
      this.autocompleteItemsSearch = [];
      return;
    }
    const me = this;
    this.service.getPlacePredictions({input: event}, function(predictions, status) {
      me.autocompleteItemsSearch = [];
      me.zone.run(function() {
        if (predictions) {
          predictions.forEach(function(prediction) {
            me.autocompleteItemsSearch.push(prediction);
          });
        }
      });
    });
  }

  chooseItemSource(sourceData: any) {
    this.addActivityForm.controls.location.setValue(sourceData.description);
    this.autocompleteItemsSearch = [];
    this.getLatLngFromAddress(sourceData.description);
  }
  getLatLngFromAddress(address) {
    console.log('getLatLngFromAddress !!!!');
    let _this = this;
   return new Promise(function(resolve, reject) {
     let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    _this.nativeGeocoder.forwardGeocode(address, options)
        .then((result: NativeGeocoderResult[]) => {
          console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
          resolve ({lat : result[0].latitude, lng : result[0].longitude, name:address})
          _this.latitude = result[0].latitude;
          _this.longitude = result[0].longitude;
        })
        .catch((error: any) => {
          console.log(error)
          reject(error)
        });
   });
  }

  addform(file) {
    console.log('this.imageData', this.imageData);
    if (
      this.addActivityForm.value.activityname == '' ||
      this.addActivityForm.value.activitydetails == '' ||
      this.addActivityForm.value.totalspots == '' ||
      this.addActivityForm.value.freespots == '' ||
      this.addActivityForm.value.skilllevel == '' ||
      this.addActivityForm.value.price == '' ||
      this.addActivityForm.value.startdatetime == '' ||
      this.addActivityForm.value.enddatetime == '' ||
      this.addActivityForm.value.location == ''
    ) {
      this.toastClickmailpassword();
    }

    if (
      this.addActivityForm.value.activityname != '' &&
      this.addActivityForm.value.activitydetails != '' &&
      this.addActivityForm.value.totalspots != '' &&
      this.addActivityForm.value.freespots != '' &&
      this.addActivityForm.value.skilllevel != '' &&
      this.addActivityForm.value.price != '' &&
      this.addActivityForm.value.startdatetime != '' &&
      this.addActivityForm.value.enddatetime != '' &&
      this.addActivityForm.value.location != ''
    ) {
    const formData = new FormData();
    formData.append('activity_name', this.addActivityForm.value.activityname);
    formData.append('activity_details', this.addActivityForm.value.activitydetails);
    formData.append('total_spots', this.addActivityForm.value.totalspots);
    formData.append('free_spots', this.addActivityForm.value.freespots);
    formData.append('skill_level', this.addActivityForm.value.skilllevel);
    formData.append('price', this.addActivityForm.value.price);
    formData.append('start_datetime', this.addActivityForm.value.startdatetime);
    formData.append('end_datetime', this.addActivityForm.value.enddatetime);
    formData.append('location', this.addActivityForm.value.location);
    formData.append('court_blocked', this.addActivityForm.value.courtblocked);
    formData.append('mark_game_as_private', this.addActivityForm.value.markprivate);
    formData.append('post_game', this.addActivityForm.value.postgame);
    formData.append('photo', 'data:image/png;base64,' + this.imageData);
    formData.append('latitude', this.latitude);
    formData.append('longitude', this.longitude);
    this.handleButtonClick();
    this.httpClient.post('https://alphawizz.com/bsletsplay/Api/Activity/addActivity', formData).subscribe(data => {
      // this.handleButtonClick();
          if (data) {
            console.log(data, 'data');
            this.loadingCtrl.dismiss();

            swal.fire({
              icon: 'success',
              title: 'Activity',
              text: 'Activity added successfully'
            });
            this.router.navigate(['/dashboard']);
          } else {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            });
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  // });
  }
}
