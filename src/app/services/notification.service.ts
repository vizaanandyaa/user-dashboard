import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NoticeType = 'success' | 'error' | 'info';

export interface Notice {
  message: string;
  type: NoticeType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notice$ = new BehaviorSubject<Notice | null>(null);
  notice$ = this._notice$.asObservable();

  show(message: string, type: NoticeType = 'info') {
    this._notice$.next({ message, type });
    setTimeout(() => this.clear(), 3000);
  }
  clear() { this._notice$.next(null); }
}
