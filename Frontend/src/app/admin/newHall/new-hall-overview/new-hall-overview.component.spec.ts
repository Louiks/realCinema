import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHallOverviewComponent } from './new-hall-overview.component';

describe('NewHallOverviewComponent', () => {
  let component: NewHallOverviewComponent;
  let fixture: ComponentFixture<NewHallOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHallOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHallOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
