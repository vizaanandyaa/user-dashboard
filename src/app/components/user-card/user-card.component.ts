import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  standalone : true,
  imports: [CommonModule],
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() selected = new EventEmitter<number>();
}
