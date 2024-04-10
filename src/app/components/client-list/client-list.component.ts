import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  currentPage: number = 0;
  pageSize: number = 10; // Ajusta según tus necesidades

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.retrieveClients();
  }

  retrieveClients(): void {
    this.clientService.getClients(this.currentPage, this.pageSize)
      .subscribe(
        data => {
          this.clients = data; // Asegúrate de ajustar esto según la respuesta de tu API
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteClient(id: number | undefined ): void {
    this.clientService.deleteClient(id)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveClients();
        },
        error => {
          console.log(error);
        });
  }

  // Métodos para cambiar de página, editar, etc.

  editClient(clientId: number  | undefined) {
    
  }


}
