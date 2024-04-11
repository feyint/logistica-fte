import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.model'; // Asegúrate de definir este modelo
import { Client } from '../models/client.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entregas`);
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/entregas/${id}`);
  }

  createDelivery(delivery: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entregas`, delivery);
  }

  updateDelivery(id: number | undefined , delivery: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/entregas/${id}`, delivery);
  }

  deleteDelivery(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/entregas/${id}`);
  }

  getClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clientes`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
  }

}
