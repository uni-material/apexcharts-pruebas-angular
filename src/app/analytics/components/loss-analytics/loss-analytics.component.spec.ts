import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossAnalyticsComponent } from './loss-analytics.component';

describe('LossAnalyticsComponent', () => {
  let component: LossAnalyticsComponent;
  let fixture: ComponentFixture<LossAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LossAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LossAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
