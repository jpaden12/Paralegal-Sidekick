import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { AppService } from '../../app.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { SqliteClientProfileService } from '../../core/sqlite-client-profile.service';
import { Mocked } from 'vitest';
import { ClientProfile } from '../../models/client-profile.model';
import { GenderTypes } from '../../models/types';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let globalState : AppService;

  const mockSQLiteClientProfileService: Mocked<any> = {
    getAllProfiles: vi.fn(),
    toClientProfile: vi.fn(),
    parseGender: vi.fn()
  };

  const mockClients: ClientProfile[] = [
    {
      id: 1,
      name: 'Khloe Kardashian',
      date_of_birth: new Date(),
      ssn: 1,
      address: 'string',
      gender: GenderTypes.Female,

      medical_provider_name: 'The Doctor',
      medical_provider_address: '123 Medical Street',
      savedForms: [],
    },
    {
      id: 2,
      name: 'Patrick Mahomes',
      date_of_birth: new Date(),
      ssn: 2,
      address: 'Address',
      gender: GenderTypes.Male,

      medical_provider_name: 'The Doctor',
      medical_provider_address: '123 Physicans Drive',
      savedForms: [],
    },
    {
      id: 3,
      name: 'Jerry Seinfeld',
      date_of_birth: new Date(),
      ssn: 3,
      address: 'string',
      gender: GenderTypes.Female,

      medical_provider_name: 'The Doctor',
      medical_provider_address: '123 Nursing Avenue',
      savedForms: [],
    },
    {
      id: 4,
      name: 'Lin-Manuel Miranda',
      date_of_birth: new Date(),
      ssn: 4,
      address: 'string',
      gender: GenderTypes.Male,

      medical_provider_name: 'The Doctor',
      medical_provider_address: '123 Feelbetter Blvd',
      savedForms: [],
    },
  ];

  beforeEach(async () => {
    mockSQLiteClientProfileService.getAllProfiles.mockReturnValue(mockClients);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [AppService,
        {provide: SqliteClientProfileService, useValue: mockSQLiteClientProfileService},
        provideRouter(routes)
      ],
    }).compileComponents();

    globalState = TestBed.inject(AppService);
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

  // Test if clicking the dropdowns and going to the next page updates the state
  it('state should update correctly', async () => {

    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);

    const formSelect: MatSelectHarness = await loader.getHarness(
      MatSelectHarness.with({ selector: '#form-dropdown' }),
    );
    await formSelect.open();

    const formOptions = await formSelect.getOptions({ text: 'HIPAA Authorization' });
    await formOptions[0].click();

    const clientSelect: MatSelectHarness = await loader.getHarness(
      MatSelectHarness.with({ selector: '#client-dropdown' })
    );
    await clientSelect.open();

    const clientOptions = await clientSelect.getOptions({ text: 'Lin-Manuel Miranda' });
    await clientOptions[0].click();

    const proceedButton = fixture.debugElement.query(By.css('#proceed-to-form')).nativeElement;
    proceedButton.click();

    expect(globalState.form()).not.toBeNull();
    expect(globalState.form()?.formName).toBe("HIPAA Authorization");
    expect(globalState.profile()).not.toBeNull();
    expect(globalState.profile()?.name).toBe("Lin-Manuel Miranda");

  });

  // Test if selecting the Court Subpoena form and going to the next page
  // updates the state. Uses MatSelectHarness rather than clicking DOM
  // elements directly, since mat-select renders its options into a CDK
  // overlay attached to the document body rather than inside this
  // component's own element tree, so a plain fixture.debugElement.query
  // can't find them.
  it('state should update correctly with the Court Subpoena form', async () => {
    const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture);
    const formSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#form-dropdown' }));
    await formSelect.open();
    const options = await formSelect.getOptions({ text: 'Court Subpoena' });
    await options[0].click();

    const proceedButton = fixture.debugElement.query(By.css('#proceed-to-form')).nativeElement;
    proceedButton.click();

    expect(globalState.form()).not.toBeNull();
    expect(globalState.form()?.formName).toBe("Court Subpoena");
  });


});
