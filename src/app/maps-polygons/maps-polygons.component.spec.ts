import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsPolygonsComponent } from './maps-polygons.component';

describe('MapsPolygonsComponent', () => {
  let component: MapsPolygonsComponent;
  let fixture: ComponentFixture<MapsPolygonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsPolygonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsPolygonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
