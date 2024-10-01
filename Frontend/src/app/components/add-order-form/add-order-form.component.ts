import { Component, EventEmitter, Output} from '@angular/core';
import { Order } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-add-order-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-order-form.component.html',
  styleUrl: './add-order-form.component.css'
})
export class AddOrderFormComponent {
	constructor(private page: PageService) { }

	order: Order = {} as Order;
	isEditing: boolean = false;

	@Output() created: EventEmitter<Order> = new EventEmitter<Order>();
	@Output() edited: EventEmitter<Order> = new EventEmitter<Order>();

	ngOnInit(): void {
		this.page.editRequested.subscribe(v => this.edit(v));
	}

	submit(): void {
		let value: Order = this.order;
		this.order = {} as Order;
		if (this.isEditing) {
			this.isEditing = false;
			this.edited.emit(value);
		} else {
			this.created.emit(value);
		}
	}

	edit(order: Order): void {
		this.isEditing = true;
		this.order = {... order};
	}
}
