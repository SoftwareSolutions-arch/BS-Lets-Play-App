import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SidebarPage } from './sidebar.page';

describe('SidebarPage', () => {
  let component: SidebarPage;
  let fixture: ComponentFixture<SidebarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
