import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm: FormGroup;
  isEditMode: boolean = false;
  deliveryId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deliveryForm = this.fb.group({
      tipoProducto: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      fechaRegistro: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      direccionEntrega: ['', Validators.required],
      precioEnvio: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Logica para determinar si es modo edición y cargar datos de entrega si corresponde
  }

  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      return;
    }
    const deliveryData = this.deliveryForm.value;
    if (this.isEditMode) {
      // Lógica para actualizar la entrega
    } else {
      // Lógica para crear una nueva entrega
    }
  }
  
  cancel(): void {
    this.router.navigate(['/deliveries']); // Ajusta según tus rutas
  }
}
