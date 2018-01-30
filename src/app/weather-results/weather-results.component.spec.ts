import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResultsComponent } from './weather-results.component';

describe('WeatherResultsComponent', () => {
  let component: WeatherResultsComponent;
  let fixture: ComponentFixture<WeatherResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
