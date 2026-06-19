import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompletionComponent } from './form-completion.component';

describe('FormCompletionComponent', () => {
  let component: FormCompletionComponent;
  let fixture: ComponentFixture<FormCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCompletionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCompletionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
