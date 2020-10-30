import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.sass'],
})
export class HallComponent {
  // Random HEX color.
  public backgroundColor: string;

  constructor(stateService: StateService) {
    // Subscribe to Time value changes and call color generator.
    stateService.timeSource.subscribe(() => {
      this.backgroundColor = this.generateRandomColor();
    });
  }

  // Generate random HEX color on every call.
  private generateRandomColor() {
    return (
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
    );
  }
}
