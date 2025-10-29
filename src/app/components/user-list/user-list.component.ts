import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, UserCardComponent, UserDetailComponent, SpinnerComponent],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private search$ = new BehaviorSubject<string>('');
  private page$ = new BehaviorSubject<number>(1);
  pageSize = 6;

  // deklarasi saja dulu
  view$!: Observable<{ slice: any[]; page: number; pages: number; total: number; term: string }>;

  constructor(public usersSvc: UserService) {}

  ngOnInit(): void {
    this.view$ = combineLatest([this.usersSvc.users$, this.search$, this.page$]).pipe(
      map(([users, term, page]) => {
        const t = term.toLowerCase().trim();
        const filtered = !t ? users : users.filter(u =>
          u.name.toLowerCase().includes(t) ||
          u.email.toLowerCase().includes(t) ||
          (u.address?.city || '').toLowerCase().includes(t)
        );
        const total = filtered.length;
        const pages = Math.max(1, Math.ceil(total / this.pageSize));
        const start = (page - 1) * this.pageSize;
        const slice = filtered.slice(start, start + this.pageSize);
        return { slice, page, pages, total, term };
      })
    );
  }

  setSearch(term: string) { this.search$.next(term); this.page$.next(1); }
  selectUser(id: number) { this.usersSvc.selectUser(id); }
  go(p: number) { this.page$.next(p); }
}
