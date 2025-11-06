import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Productos } from "../producto.model";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = 'https://miseempleado2025-default-rtdb.firebaseio.com';

  constructor(private httpClient: HttpClient) {}

  // Agregar nuevo producto 
  agregar_producto(producto: Productos) {
    return this.httpClient.post(`${this.url}/productos.json`, producto);
  }

  // Cargar todos los productos
  cargar_productos() {
    return this.httpClient.get(`${this.url}/productos.json`);
  }

  // Actualizar producto existente
  actualizar_producto(id: string, producto: Productos) {
    return this.httpClient.put(`${this.url}/productos/${id}.json`, producto);
  }

  // Eliminar producto
  eliminar_producto(id: string) {
    return this.httpClient.delete(`${this.url}/productos/${id}.json`);
  }
}
