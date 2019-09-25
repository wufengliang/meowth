import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDevelopComponent } from './system-develop.component';

describe('SystemDevelopComponent', () => {
  let component: SystemDevelopComponent;
  let fixture: ComponentFixture<SystemDevelopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDevelopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDevelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
