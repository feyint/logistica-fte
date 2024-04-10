// En client-form.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;
  clientId: number = 0;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });

    // Verificar si hay un id de cliente en la ruta para modo edición
    this.clientId = this.route.snapshot.params['id'];
    if (this.clientId) {
      this.isEditMode = true;
      this.clientService.getClient(this.clientId).subscribe(data => {
        this.clientForm?.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm?.invalid) {
      return;
    }

    const clientData = this.clientForm?.value;
    if (this.isEditMode) {
      this.clientService.updateClient(this.clientId, clientData).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.createClient(clientData).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }


  cancel(): void {
    this.router.navigate(['/clients']); // Ajusta según la ruta de tu lista de clientes
  }
}
