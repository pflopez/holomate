import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPackComponent } from './custom-pack.component';

describe('CustomPackComponent', () => {
  let component: CustomPackComponent;
  let fixture: ComponentFixture<CustomPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
