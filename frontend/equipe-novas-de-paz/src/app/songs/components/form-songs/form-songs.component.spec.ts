import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSongsComponent } from './form-songs.component';

describe('FormSongsComponent', () => {
  let component: FormSongsComponent;
  let fixture: ComponentFixture<FormSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
