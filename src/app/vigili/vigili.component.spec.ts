import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VigiliComponent } from './vigili.component';


describe('VigiliComponent', () => {
  let component: VigiliComponent;
  let fixture: ComponentFixture<VigiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VigiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VigiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
