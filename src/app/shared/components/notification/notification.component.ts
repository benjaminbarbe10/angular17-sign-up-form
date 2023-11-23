import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapColors } from '../../interfaces/colors';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input({ required: true }) messageKey!: string;
  @Input() color: BootstrapColors = 'danger';
  @Input() size: 'sm' | 'lg' = 'sm';
  @Input() icon: string = 'exclamation-triangle';
}
