import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { NotificationComponent } from '../components/notification/notification.component';

@Component({
  selector: 'app-validation-error-messages',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './validation-error-messages.component.html',
})
export class ValidationErrorMessagesComponent {
  @Input({ required: true }) control!: AbstractControl;
}
