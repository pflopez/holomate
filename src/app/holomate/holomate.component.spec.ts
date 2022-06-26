import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolomateComponent } from './holomate.component';

describe('HolomateComponent', () => {
  let component: HolomateComponent;
  let fixture: ComponentFixture<HolomateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolomateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolomateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
