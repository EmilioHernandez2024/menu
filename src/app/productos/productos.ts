import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductosService } from '../productos.service';
import { Productos } from '../../producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Producto implements OnInit {

  private productosService = inject(ProductosService);

  producto: Productos = new Productos('', '', 0, '');
  productos: Productos[] = []; 
  categorias = ['Electrónica', 'Ropa', 'Hogar', 'Alimentos'];

  ngOnInit(): void {
    this.cargarLista();
  }

  private cargarLista() {
    this.productosService.cargar_productos().subscribe((data: any) => {

      if (!data) {
        this.productos = [];
        return;
      }


      if (Array.isArray(data)) {
        // eliminar posibles "null" que aparecen si se borraron items
        this.productos = data.filter((x: any) => x !== null);
        return;
      }


      if (typeof data === 'object') {
        const keys = Object.keys(data);
        // Si claves son '0','1','2' mantenemos orden numérico
        if (keys.every(k => !isNaN(parseInt(k, 10)))) {
          const arr: Productos[] = [];
          keys
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .forEach(k => arr.push(data[k]));
          this.productos = arr;
        } else {

          this.productos = Object.values(data);
        }
        return;
      }


      this.productos = [];
    }, (err) => {
      console.error('Error al cargar productos:', err);
      Swal.fire('Error', 'No se pudieron cargar los productos desde Firebase.', 'error');
    });
  }

  onSubmit(form: any) {
    if (form.invalid) {
      Swal.fire('Error de Validación', 'Por favor, completa los campos requeridos.', 'error');
      Object.keys(form.controls).forEach(key => form.controls[key].markAsTouched());
      return;
    }

    // Añadimos el nuevo producto 
    this.productos.push(this.producto);

    // Guardamos la lista completa en Firebase 
 this.productosService.guardar_productos(this.productos).subscribe({
  next: () => {
    Swal.fire({
      icon: 'success',
      title: '¡Guardado con Éxito!',
      text: `El producto "${this.producto.titulo}" se agregó correctamente.`,
      timer: 2000,
      timerProgressBar: true
    });

    //  Recargamos lista desde Firebase
    this.cargarLista();

    // Resetear formulario y modelo
    form.resetForm();
    this.producto = new Productos('', '', 0, '');
  },
  error: (error: any) => {
    console.error('Error al guardar productos:', error);
    Swal.fire('Error de Conexión', 'No se pudo guardar el producto. Revisa la consola.', 'error');
  }
});
  }
}
