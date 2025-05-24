import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPieAnalyticsComponent } from './order-pie-analytics.component';

describe('OrderPieAnalyticsComponent', () => {
  let component: OrderPieAnalyticsComponent;
  let fixture: ComponentFixture<OrderPieAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPieAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPieAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
