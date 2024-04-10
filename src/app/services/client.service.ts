import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model'; // Asume que tienes una clase modelo para Client

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/clientes'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  getClients(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getClient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createClient(client: Client): Observable<any> {
    return this.http.post(this.baseUrl, client);
  }

  updateClient(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteClient(id: number|undefined): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
