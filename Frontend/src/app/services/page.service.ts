import { EventEmitter, Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor() { }

  editRequested: EventEmitter<Order> = new EventEmitter<Order>();

  requestEdit(order: Order): void {
	this.editRequested.emit(order);
  }
}
