import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkersCreationComponent } from './markers-creation.component';

describe('MarkersCreationComponent', () => {
  let component: MarkersCreationComponent;
  let fixture: ComponentFixture<MarkersCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkersCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkersCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
