import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two elements for choosing things', async () => {
    const app = fixture.debugElement.componentInstance;
    const nat = fixture.nativeElement as HTMLElement;
    const chooseElements = nat.querySelectorAll('.choose');
    expect(chooseElements?.length).toBe(2); 
  }); 


});
