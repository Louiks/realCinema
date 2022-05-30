import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaRepertoireCardComponent } from './cinema-repertoire-card.component';

describe('CinemaRepertoireCardComponent', () => {
  let component: CinemaRepertoireCardComponent;
  let fixture: ComponentFixture<CinemaRepertoireCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaRepertoireCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaRepertoireCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
