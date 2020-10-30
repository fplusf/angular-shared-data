import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public timeSource = new BehaviorSubject('defaultValue');

  constructor() {}

  // Set new value to time state.
  setTimeValue(time: string) {
    this.timeSource.next(time);
  }
}
