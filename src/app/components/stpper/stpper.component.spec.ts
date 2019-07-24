import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StpperComponent } from './stpper.component';

describe('StpperComponent', () => {
  let component: StpperComponent;
  let fixture: ComponentFixture<StpperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StpperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
