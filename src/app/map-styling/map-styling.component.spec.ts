import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStylingComponent } from './map-styling.component';

describe('MapStylingComponent', () => {
  let component: MapStylingComponent;
  let fixture: ComponentFixture<MapStylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapStylingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
