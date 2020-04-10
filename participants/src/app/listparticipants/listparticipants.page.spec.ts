import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListparticipantsPage } from './listparticipants.page';

describe('ListparticipantsPage', () => {
  let component: ListparticipantsPage;
  let fixture: ComponentFixture<ListparticipantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListparticipantsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListparticipantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
