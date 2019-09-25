import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicdVariablesComponent } from './cicd-variables.component';

describe('CicdVariablesComponent', () => {
  let component: CicdVariablesComponent;
  let fixture: ComponentFixture<CicdVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicdVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicdVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
