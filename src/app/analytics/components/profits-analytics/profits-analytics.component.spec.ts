import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsAnalyticsComponent } from './profits-analytics.component';

describe('ProfitsAnalyticsComponent', () => {
  let component: ProfitsAnalyticsComponent;
  let fixture: ComponentFixture<ProfitsAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitsAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
