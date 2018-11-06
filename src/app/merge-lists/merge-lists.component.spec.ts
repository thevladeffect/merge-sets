import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MergeListsComponent} from './merge-lists.component';

describe('MergeListsComponent', () => {
  let component: MergeListsComponent;
  let fixture: ComponentFixture<MergeListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MergeListsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
