import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkousersComponent } from './alkousers.component';

describe('AlkousersComponent', () => {
  let component: AlkousersComponent;
  let fixture: ComponentFixture<AlkousersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlkousersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlkousersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
