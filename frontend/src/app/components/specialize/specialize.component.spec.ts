import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializeComponent } from './specialize.component';

describe('SpecializeComponent', () => {
  let component: SpecializeComponent;
  let fixture: ComponentFixture<SpecializeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
