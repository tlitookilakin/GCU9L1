import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { BehaviorSubject, catchError, delay, Observable, of, Subscriber } from 'rxjs';

const baseUrl: string = "http://localhost:5091/orders";

@Injectable({
  providedIn: 'root'
})
export class RestaurantFavesService {
	constructor(private client: HttpClient) { }

	private listSource: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
	private watcher: Observable<Order[]> = this.listSource.asObservable();
	private orderAgain: boolean | null = null;
	private restaurant: string | null = null;

	refresh(): void {
		let params: HttpParams = new HttpParams();

		if (this.orderAgain != null) {
			params = params.append("orderAgain", this.orderAgain);
		}
		if (this.restaurant != null) {
			params = params.append("restaurant", this.restaurant);
		}

		this.client.get<Order[]>(baseUrl, {params: params}).subscribe(r => this.listSource.next(r));
	}

	updateList(orderAgain: boolean | null = null, restaurant: string | null = null): void {
		this.restaurant = restaurant;
		this.orderAgain = orderAgain;
		this.refresh();
	}

	getAll() : Observable<Order[]> {
		return this.watcher;
	}

	get(id: Number): Observable<Order> {
		return this.client.get<Order>(baseUrl + '/' + id);
	}

	add(order: Order): void {
		order.orderAgain ??= false;
		this.client.post(baseUrl, order).subscribe(_ => this.refresh());
	}

	update(order: Order): void {
		this.client.put(baseUrl + order.id, order).subscribe(_ => this.refresh());
	}

	delete(which: Number): void {
		let url: string = baseUrl + "/" + which;
		console.log(url);
		this.client.delete(url).subscribe(_ => this.refresh());
	}
}
