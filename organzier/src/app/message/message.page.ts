import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, ActionSheetController, PopoverController, IonRouterOutlet, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(private platform: Platform){ 
  }

  ngOnInit() {
  }
}
