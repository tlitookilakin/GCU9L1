import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderFormComponent } from './add-order-form.component';

describe('AddOrderFormComponent', () => {
  let component: AddOrderFormComponent;
  let fixture: ComponentFixture<AddOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
