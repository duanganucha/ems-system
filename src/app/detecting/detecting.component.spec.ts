import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectingComponent } from './detecting.component';

describe('DetectingComponent', () => {
  let component: DetectingComponent;
  let fixture: ComponentFixture<DetectingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
