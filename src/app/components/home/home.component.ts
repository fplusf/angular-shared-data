import {
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  public currentTime: string;

  @ViewChild('time')
  public time: ElementRef;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {
    /**
     *  This code uses NgZone to run asynchronous calculation
     *  outside the Angular zone to optimize performance.
     */
    this.ngZone.runOutsideAngular(() => {
      ngZone.run(() => {
        setInterval(() => {
          this.renderer.setProperty(
            this.time.nativeElement,
            'textContent',
            this.getCurrentTime()
          );
        }, 1000);
      });
    });
  }

  // Get current local time.
  getCurrentTime() {
    const today = new Date();
    return (
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    );
  }
}
