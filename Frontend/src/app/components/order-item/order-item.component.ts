import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'tr[app-order-item]',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent {
	@Input() order: Order = {} as Order;
	@Output() deleted: EventEmitter<void> = new EventEmitter<void>();

	deleteThis() : void {
		this.deleted.emit();
	}
}
