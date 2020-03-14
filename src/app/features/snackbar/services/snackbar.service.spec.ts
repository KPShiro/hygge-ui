import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';
import { SNACKBAR_CONFIG, defaultSnacbarConfig } from '../snackbar.config';
import { RouterTestingModule } from '@angular/router/testing';


describe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
    ],
    providers: [
      SnackbarService,
      {
        provide: SNACKBAR_CONFIG,
        useValue: defaultSnacbarConfig,
      },
    ],
  }));

  it('should be created', () => {
    const service: SnackbarService = TestBed.get(SnackbarService);
    expect(service).toBeTruthy();
  });
});
