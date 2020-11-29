import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  snackSbj = new Subject<string>();

  constructor() {}

  setTooltip(tooltip: string) {
    this.snackSbj.next(tooltip);
  }

  getSnackSub(): Observable<string> {
    return this.snackSbj.asObservable();
  }
}
