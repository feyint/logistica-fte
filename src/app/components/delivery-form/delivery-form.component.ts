import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm: FormGroup;
  isEditMode: boolean = false;
  deliveryId: number | undefined;
  clientes: Client[] = [];
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deliveryForm = this.fb.group({
      producto: ['', Validators.required],
      cliente: ['', Validators.required],
      tipo: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      fechaRegistro: ['', Validators.required],
      fechaEntrega: ['', Validators.required],      
      precioEnvio: [null, [Validators.required, Validators.min(0)]],
      placa: ['', Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{3}$/)],
      flota: ['', Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{4}[A-Za-z]$/)],
      numeroGuia: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {    
    this.loadClientes();
    this.loadProductos();
  }






  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      return;
    }
   // const deliveryData = this.deliveryForm.value;

    
    const deliveryData = {
      cliente: {id: this.deliveryForm.value.cliente },
      producto: {id: this.deliveryForm.value.producto },
      cantidad: this.deliveryForm.value.cantidad,
      fechaRegistro: this.deliveryForm.value.fechaRegistro,
      fechaEntrega: this.deliveryForm.value.fechaEntrega,
      precioEnvio: this.deliveryForm.value.precioEnvio,
      numeroGuia: this.deliveryForm.value.numeroGuia,
      numeroFlota: this.deliveryForm.value.flota,
      placa: this.deliveryForm.value.placa,
    }

    if (this.isEditMode) {
      this.deliveryService.updateDelivery(this.deliveryId, deliveryData).subscribe(() => {
        this.router.navigate(['/deliveries']);
      });
    } else {
      this.deliveryService.createDelivery(deliveryData).subscribe(() => {
        this.router.navigate(['/deliveries']);
      });
    }
  }
  
  cancel(): void {
    this.router.navigate(['/deliveries']); // Ajusta según tus rutas
  }

  loadClientes(): void {
    this.deliveryService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  loadProductos(): void {
    this.deliveryService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }
}
