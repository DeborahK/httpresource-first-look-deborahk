import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { VehicleSelectionComponent } from './app/vehicles/vehicle-selection/vehicle-selection.component';
import 'zone.js';

@Component({
  selector: 'app-root',
  imports: [ VehicleSelectionComponent],
  template: `
   <app-vehicle-selection/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
   providers: [ provideHttpClient() ]
 });
 