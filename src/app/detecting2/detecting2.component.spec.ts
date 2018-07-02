import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detecting2Component } from './detecting2.component';

describe('Detecting2Component', () => {
  let component: Detecting2Component;
  let fixture: ComponentFixture<Detecting2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detecting2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detecting2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
