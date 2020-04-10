import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePaasswordPage } from './change-paassword.page';

describe('ChangePaasswordPage', () => {
  let component: ChangePaasswordPage;
  let fixture: ComponentFixture<ChangePaasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePaasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePaasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
