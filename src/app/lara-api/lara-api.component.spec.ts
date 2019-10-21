import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaraApiComponent } from './lara-api.component';

describe('LaraApiComponent', () => {
  let component: LaraApiComponent;
  let fixture: ComponentFixture<LaraApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaraApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaraApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
