import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Delivery } from 'src/app/models/delivery.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  deliveries: any[] = [];

  constructor(private deliveryService: DeliveryService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveDeliveries();
  }

  retrieveDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe({
      next: (data) => {
        this.deliveries = data;
      },
      error: (e) => console.error(e)
    });
  }

  deleteDelivery(id: number | undefined ): void {
    this.deliveryService.deleteDelivery(id).subscribe({
      next: (res) => {
        console.log(res);
        this.retrieveDeliveries(); // Refresh the list after deletion
      },
      error: (e) => console.error(e)
    });
  }

  editDelivery(id: number | undefined): void {
    this.router.navigate(['/delivery/form', id]);
  }
}
