import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemDevelopComponent } from './add-system-develop.component';

describe('AddOreditSystemComponent', () => {
  let component: AddSystemDevelopComponent;
  let fixture: ComponentFixture<AddSystemDevelopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSystemDevelopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemDevelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
