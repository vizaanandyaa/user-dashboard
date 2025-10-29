// search-box.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-box',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Output() termChange = new EventEmitter<string>();
  private term$ = new BehaviorSubject<string>('');

  ngOnInit() {
    this.term$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(v => this.termChange.emit(v));
  }

  onInput(v: string) { this.term$.next(v); }
}
