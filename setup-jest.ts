import localeEn from '@angular/common/locales/en';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { TestBed } from '@angular/core/testing';

registerLocaleData(localeEn, 'en-US');

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      {
        provide: LOCALE_ID,
        useValue: 'en-US',
      },
    ],
  });
});
