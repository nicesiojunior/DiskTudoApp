/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogiinComponent } from './logiin.component';

describe('LogiinComponent', () => {
  let component: LogiinComponent;
  let fixture: ComponentFixture<LogiinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogiinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogiinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
