import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseSeedingComponent } from './database-seeding.component';

describe('DatabaseSeedingComponent', () => {
  let component: DatabaseSeedingComponent;
  let fixture: ComponentFixture<DatabaseSeedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseSeedingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseSeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
