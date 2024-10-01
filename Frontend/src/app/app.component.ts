import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderHistoryComponent } from "./components/order-history/order-history.component";
import { AddOrderFormComponent } from "./components/add-order-form/add-order-form.component";
import { RestaurantFavesService } from './services/restaurant-faves.service';
import { Order } from './models/order';
import { OrderFilterComponent } from "./components/order-filter/order-filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderHistoryComponent, AddOrderFormComponent, OrderFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
	constructor(private api: RestaurantFavesService) { }
	title = 'Restaurant Favorites';

	addFavorite(order: Order) {
		this.api.add(order);
	}

	updateFavorite(order: Order) {
		this.api.update(order);
	}
}
