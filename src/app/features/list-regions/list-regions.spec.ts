import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegions } from './list-regions';

describe('ListRegions', () => {
  let component: ListRegions;
  let fixture: ComponentFixture<ListRegions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRegions],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRegions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
