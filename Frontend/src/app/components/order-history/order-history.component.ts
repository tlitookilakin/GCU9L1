import { Component } from '@angular/core';
import { RestaurantFavesService } from '../../services/restaurant-faves.service';
import { delay, map, Observable, OperatorFunction } from 'rxjs';
import { Order } from '../../models/order';
import { AsyncPipe } from '@angular/common';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [AsyncPipe, OrderItemComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
	constructor(private api: RestaurantFavesService) { }

	allItems: Observable<Order[]> | null = null;

	ngOnInit() {
		this.allItems = this.api.getAll();
		this.api.refresh();
	}

	deleteItem(order: Order) {
		if (order.id != null) {
			this.api.delete(order.id);
		}
	}
}
