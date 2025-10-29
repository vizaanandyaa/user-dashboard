import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner" [class.text-blue-600]="color==='blue'"></div>`
})
export class SpinnerComponent { @Input() color: 'blue' | 'default' = 'default'; }
