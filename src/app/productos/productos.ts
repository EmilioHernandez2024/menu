import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { Productos } from '../../producto.model';
import { ProductosEditables } from '../productos-editables/productos-editables';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductosEditables,RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Producto implements OnInit {

  private productosService = inject(ProductosService);

  producto: Productos = new Productos('', '', 0, '');
  productos: Productos[] = []; 
  categorias = ['Aperitivos / Entrantes', 'Ensaladas', 'Platos Principales', 'Pastas', 'Postres', 'Bebidas'];
  productoSeleccionado: Productos | null = null;
  indexSeleccionado: number | null = null;

  ngOnInit(): void {
    this.cargarLista();
  }
 
  cargarLista() {
  this.productosService.cargar_productos().subscribe({
    next: (data: any) => {
      //si la base no trae nada (está vacío), dejo la lista vacía y no hago más nad
      if (!data) { this.productos = []; return; }
   //aqui lo que hace es convertir lo que viene de la base (un objeto con ids como claves) en un array de productos
      this.productos = Object.entries(data).map(([key, value]: [string, any]) => ({
        id: key,
        ...value
      }));
    },
    error: error => console.error('Error al cargar productos:', error)
  });
}

  onSubmit(form: any) {
  if (form.invalid) return;

  this.productosService.agregar_producto(this.producto).subscribe({
    next: () => {
      Swal.fire('¡Guardado!', 'El producto se agregó correctamente.', 'success');
      form.resetForm();
      this.producto = new Productos('', '', 0, '');
      this.cargarLista();
    },
    error: error => {
      console.error('Error al guardar:', error);
      Swal.fire('Error', 'No se pudo guardar el producto.', 'error');
    }
  });
}

  seleccionarProducto(p: Productos, index: number) {
    this.productoSeleccionado = { ...p };
    this.indexSeleccionado = index;
  }
 
  refrescarLista() {
    this.cargarLista();
  }
}
