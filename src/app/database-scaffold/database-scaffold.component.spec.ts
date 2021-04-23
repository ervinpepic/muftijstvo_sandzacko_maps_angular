import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseScaffoldComponent } from './database-scaffold.component';

describe('DatabaseScaffoldComponent', () => {
  let component: DatabaseScaffoldComponent;
  let fixture: ComponentFixture<DatabaseScaffoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseScaffoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseScaffoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
