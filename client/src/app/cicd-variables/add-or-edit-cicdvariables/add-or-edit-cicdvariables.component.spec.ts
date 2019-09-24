import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCicdvariablesComponent } from './add-or-edit-cicdvariables.component';

describe('AddOrEditCicdvariablesComponent', () => {
  let component: AddOrEditCicdvariablesComponent;
  let fixture: ComponentFixture<AddOrEditCicdvariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditCicdvariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditCicdvariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
