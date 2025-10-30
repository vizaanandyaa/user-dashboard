import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { User } from '../models/user';
import { NotificationService } from './notification.service';

const BASE = 'https://jsonplaceholder.typicode.com';

@Injectable({ providedIn: 'root' })
export class UserService {

  private reload$ = new BehaviorSubject<void>(undefined);
  private selectedId$ = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient, private notify: NotificationService) {}

  users$ = this.reload$.pipe(
    switchMap(() =>
      this.http.get<User[]>(`${BASE}/users`).pipe(
        map(users => {
          this.notify.show('Users loaded successfully', 'success');
          return users;
        }),
        catchError(err => {
          this.notify.show('Failed to load users', 'error');
          return of([] as User[]);
        })
      )
    ),
    shareReplay(1)
  );

  selectUser(id: number) { this.selectedId$.next(id); }
  selectedIdStream$ = this.selectedId$.asObservable();

  userDetail$ = this.selectedId$.pipe(
    switchMap(id => {
      if (id == null) return of(null);
      return this.http.get<User>(`${BASE}/users/${id}`).pipe(
        map(u => u),
        catchError(_ => {
          this.notify.show('Failed to load user detail', 'error');
          return of(null);
        })
      );
    })
  );
}
