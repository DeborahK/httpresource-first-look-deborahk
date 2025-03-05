import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { setErrorMessage } from '../error-message';

@Injectable({
   providedIn: 'root'
})
export class VehicleService {
   private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

   vehicleModels = signal<string[]>([
      'landspeeder', 'airspeeder', 'bomber', 'transport',
      'crawler', 'skyhopper', 'starfighter', 'barge'
   ]);
   selectedModel = signal<string>('');

   // Using ** resource() ** with a parameter
   // private vehiclesResource = resource({
   //    request: this.selectedModel,
   //    loader: (param) => fetch(`${this.vehicleUrl}?search=${param.request}`)
   //       .then(res => res.json() as Promise<VehicleResponse>)
   // });

   // Using ** rxResource() ** with a parameter
   // private http = inject(HttpClient);
   // private vehiclesResource = rxResource({
   //    request: this.selectedModel,
   //    loader: (param) => this.http.get<VehicleResponse>(
   //       `${this.vehicleUrl}?search=${param.request}`).pipe(
   //          map(vr => vr.results)
   //    )
   // });
   // vehicles = computed(() => this.vehiclesResource.value() ?? [] as Vehicle[]);

   // Using ** httpResource() ** with a parameter
   private vehiclesResource = httpResource<VehicleResponse>(() =>
      `${this.vehicleUrl}?search=${this.selectedModel()}`);

   // Using ** httpResource() ** with an object configuring a more complex request (HttpResourceRequest)
   // private vehiclesResource = httpResource<VehicleResponse>(() => ({
   //    url: this.vehicleUrl,
   //    method: 'GET',
   //    headers: {
   //       accept: 'application/json'
   //    },
   //    params: {
   //       search: this.selectedModel(),
   //    },
   // }));

   // Using ** httpResource() ** with POST example
   // private userResource = httpResource(() => ({
   //    url: 'https://fakestoreapi.com/auth/login',
   //    method: 'POST',
   //    body: {
   //       username: 'mor_2314',
   //       password: '83r5^_'
   //    },
   // }));
   // eff = effect(() => console.log(JSON.stringify(this.userResource.value())));

   vehicles = computed(() => this.vehiclesResource.value()?.results ?? [] as Vehicle[]);
   error = computed(() => this.vehiclesResource.error() as HttpErrorResponse);
   errorMessage = computed(() => setErrorMessage(this.error(), 'Vehicle'));
   isLoading = this.vehiclesResource.isLoading;
}

export interface VehicleResponse {
   count: number;
   next: string;
   previous: string;
   results: Vehicle[]
}

export interface Vehicle {
   name: string;
   cost_in_credits: number;
   model: string;
}
