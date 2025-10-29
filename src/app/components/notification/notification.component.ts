import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone:true,
  templateUrl: './notification.component.html',
  imports: [CommonModule],
})
export class NotificationComponent {
  constructor(public notify: NotificationService) {}
}
