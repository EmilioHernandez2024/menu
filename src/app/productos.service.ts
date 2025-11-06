import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Productos } from "../producto.model";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl = 'https://miseempleado2025-default-rtdb.firebaseio.com';

  constructor(private httpClient: HttpClient) {}

  // Guardar todos los productos en Firebase 
  guardar_productos(productos: Productos[]) {
    return this.httpClient.put(`${this.baseUrl}/productos.json`, productos);
  }

  // Cargar productos desde Firebase
  cargar_productos() {
    return this.httpClient.get(`${this.baseUrl}/productos.json`);
  }
}
