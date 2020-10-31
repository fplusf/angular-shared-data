import {
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  @ViewChild('time')
  public time: ElementRef;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    /**
     *  This code uses NgZone to run asynchronous calculation
     *  outside the Angular zone to optimize performance.
     */
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => {
        // Every second renders new value to DOM element using  custom rendering.
        setInterval(() => {
          this.renderer.setProperty(
            this.time.nativeElement,
            'textContent',
            this.getCurrentTime()
          );
        }, 1000);

        // Update state on State Service every 4 - seconds.
        setInterval(
          () => this.stateService.setTimeValue(this.getCurrentTime()),
          4000
        );
      });
    });
  }

  // Get current local time.
  private getCurrentTime(): string {
    const today = new Date();
    return (
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    );
  }
}
