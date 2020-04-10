import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivityJoinPage } from './activity-join.page';

describe('ActivityJoinPage', () => {
  let component: ActivityJoinPage;
  let fixture: ComponentFixture<ActivityJoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityJoinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityJoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
