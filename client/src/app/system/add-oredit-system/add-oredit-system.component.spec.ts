import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOreditSystemComponent } from './add-oredit-system.component';

describe('AddOreditSystemComponent', () => {
  let component: AddOreditSystemComponent;
  let fixture: ComponentFixture<AddOreditSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOreditSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
