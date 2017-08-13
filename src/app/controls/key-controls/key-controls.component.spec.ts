import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyControlsComponent } from './key-controls.component';

describe('KeyControlsComponent', () => {
  let component: KeyControlsComponent;
  let fixture: ComponentFixture<KeyControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
