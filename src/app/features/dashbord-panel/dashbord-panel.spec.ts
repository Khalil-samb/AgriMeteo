import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPanel } from './dashbord-panel';

describe('DashbordPanel', () => {
  let component: DashbordPanel;
  let fixture: ComponentFixture<DashbordPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(DashbordPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
