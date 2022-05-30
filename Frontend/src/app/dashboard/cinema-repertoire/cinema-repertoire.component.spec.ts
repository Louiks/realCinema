import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaRepertoireComponent } from './cinema-repertoire.component';

describe('CinemaRepertoireComponent', () => {
  let component: CinemaRepertoireComponent;
  let fixture: ComponentFixture<CinemaRepertoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaRepertoireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
