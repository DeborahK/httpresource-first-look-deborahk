import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle.service';

@Component({
   selector: 'app-vehicle-selection',
   imports: [FormsModule],
   templateUrl: './vehicle-selection.component.html',
   styleUrl: './vehicle-selection.component.css'
})
export class VehicleSelectionComponent {
   pageTitle = "StarWars Vehicles";

   // Injected services
   private vehicleService = inject(VehicleService);

   // Signals to support the template
   vehicles = this.vehicleService.vehicles;
   isLoading = this.vehicleService.isLoading;
   errorMessage = this.vehicleService.errorMessage;
   vehicleModels = this.vehicleService.vehicleModels
   selectedModel = this.vehicleService.selectedModel;
}
