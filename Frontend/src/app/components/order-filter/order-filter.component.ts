import { Component } from '@angular/core';
import { RestaurantFavesService } from '../../services/restaurant-faves.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.css'
})
export class OrderFilterComponent {
	constructor(private api: RestaurantFavesService) { }

	showOrderAgain: boolean | null = null;
	restaurantName: string = "";

	toggleShowOrderAgain(): void {
		this.showOrderAgain = this.showOrderAgain == null ? true : this.showOrderAgain ? false : null;
		this.api.updateList(this.showOrderAgain, this.getRestaurantName());
	}

	updateRestaurantFilter(): void {
		this.api.updateList(this.showOrderAgain, this.getRestaurantName());
	}

	getRestaurantName(): string | null {
		return this.restaurantName.length > 0 ? this.restaurantName : null;
	}
}
