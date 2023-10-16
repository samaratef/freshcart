import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailesComponent } from './category-detailes.component';

describe('CategoryDetailesComponent', () => {
  let component: CategoryDetailesComponent;
  let fixture: ComponentFixture<CategoryDetailesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryDetailesComponent]
    });
    fixture = TestBed.createComponent(CategoryDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
