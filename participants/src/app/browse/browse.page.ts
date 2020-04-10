import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import {add} from "ionicons/icons";
declare var google;
@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {



  @ViewChild('map', {static: false})
  mapElement: ElementRef;

  map: any;
  address: string;
  ishidden=true;
  AllProductsHomePage: any = [];
  fullListData: any = [];
  headerLocation: any = ''
  autocompleteItemsSearch: any = [];
  service = new google.maps.places.AutocompleteService();
  markers: any = [];

  constructor(
    public zone: NgZone,
    public httpClient: HttpClient,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public alertCtrl: AlertController
  ) {
  }
  ngOnInit() {
    this.loadMap();
  }
  setMarkers() {
    console.log('all data', this.AllProductsHomePage)
    // for (let i = 0; i < this.markers.length; i++) {
    //   this.markers[i].setMap(null);
    // }

    for (let i = 0; i < this.AllProductsHomePage.length; i++) {
      let markerVal = this.AllProductsHomePage[i];
      this.markers[i] = new google.maps.Marker({
        position: {lat: parseFloat(markerVal['latitude']), lng: parseFloat(markerVal['longitude'])},
        map: this.map,
        title: markerVal['activity_name'],
        zIndex: i
      });
    }
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('tilesloaded', () => {
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  getAddressFromCoords(lattitude, longitude) {
    // console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

  async sortFilter() {
    const alert = await this.alertCtrl.create({
      header: 'Sort By',
      inputs: [
        {
          name: 'dateTime',
          type: 'date',
          // min: '2017-03-01',
          // max: ''
        },
        {
          name: 'Nearest',
          type: 'text',
          id: 'Nearest',
          value: 'Nearest',
          placeholder: 'Nearest'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data ) => {
            this.AllProductsHomePage = this.fullListData.filter(item => {
              var startDate=new Date(item['start_datetime']);
              var endDate=new Date(item['end_datetime']);
              var selectedDate=new Date(data['dateTime']);
              if(startDate.getTime() <= selectedDate.getTime() && endDate.getTime() >= selectedDate.getTime()) {
                return item;
              }
            })
            this.setMarkers();

          }
        }
      ]
    });

    await alert.present();
  }

  SearchFilter(){
    this.ishidden = !this.ishidden;
    }

  cancelSearch(){
    this.AllProductsHomePage = this.fullListData;
  }

  searchActivity(evt){
    const searchTerm = evt.srcElement.value;
    if (searchTerm == '') {
      this.AllProductsHomePage = this.fullListData;
      return;
    }
    this.AllProductsHomePage = this.fullListData.filter(item => {
        return (item['activity_name'].toString().toLowerCase().includes(searchTerm.toString().toLowerCase())|| item['activity_details'].toString().toLowerCase().includes(searchTerm.toString().toLowerCase()));
    })
    this.setMarkers();
  }

    getdetails(){
      this.httpClient.get("https://www.alphawizz.com/bsletsplay/Api/Activity/getallactivity").subscribe(data => {
            if (data) {
              this.AllProductsHomePage=data['data']
              this.fullListData=data['data']
              console.log(this.AllProductsHomePage," ==== data")
              this.setMarkers()
            }
          },
          error => {
            console.log(error);
          });
    }

    ionViewWillEnter(){
      this.getdetails();
    }

    onChangeLocation(event) {
      console.log('onChangeLocation ====',event);
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
          console.log('autocompleteItemsSearch ====', me.autocompleteItemsSearch);
        });
      });
    }
    chooseItemSource(sourceData: any) {
      this.headerLocation=sourceData.description;
      this.autocompleteItemsSearch = [];
    }
    searchByLocation(loc){
    if (loc == '') {
      this.AllProductsHomePage = this.fullListData;
      return;
    }
    this.AllProductsHomePage = this.fullListData.filter(item => {
        return (item['location'].toString().toLowerCase().includes(loc.toString().toLowerCase()));
    })
    this.setMarkers();
    }
}
