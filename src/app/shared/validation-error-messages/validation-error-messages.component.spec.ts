import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { ValidationErrorMessagesComponent } from './validation-error-messages.component';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

describe('ValidationErrorMessagesComponent', () => {
  let component: ValidationErrorMessagesComponent;
  let fixture: ComponentFixture<ValidationErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationErrorMessagesComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationErrorMessagesComponent);
    component = fixture.componentInstance;
  });

  it('should not display any notifications when the control is valid', () => {
    component.control = new FormControl('test', [Validators.required]);
    component.control.markAsDirty();
    fixture.detectChanges();

    const notifications = fixture.debugElement.queryAll(By.css('app-notification'));
    expect(notifications.length).toBe(0);
  });

  it('should display the "required" error message when the control is invalid and required', () => {
    component.control = new FormControl(null, [Validators.required]);
    component.control.markAsDirty();
    fixture.detectChanges();

    const notifications = fixture.debugElement.queryAll(By.css('app-notification'));
    expect(notifications.length).toBe(1);
    expect(notifications[0].nativeElement.textContent).toContain('error.field.required');
  });
});
