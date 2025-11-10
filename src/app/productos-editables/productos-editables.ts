import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Productos } from '../../producto.model';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos-editables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-editables.html',
  styleUrl: './productos-editables.css',
})
export class ProductosEditables implements OnInit {
  private productosService = inject(ProductosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  producto: Productos = new Productos('', '', 0, '');
  categorias = ['Aperitivos / Entrantes', 'Ensaladas', 'Platos Principales', 'Pastas', 'Postres', 'Bebidas'];
  idProducto: string = '';

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.paramMap.get('id') || '';

    if (this.idProducto) {
      this.productosService.cargar_productos().subscribe({
        next: (data: any) => {
          if (data && data[this.idProducto]) {
            this.producto = { ...data[this.idProducto], id: this.idProducto };
          }
        },
        error: error => console.error('Error al cargar producto:', error)
      });
    }
  }

  guardarCambios() {
    this.productosService.actualizar_producto(this.idProducto, this.producto).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/productos']);
        });
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
      }
    });
  }

  eliminarProducto() {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if (res.isConfirmed) {
        this.productosService.eliminar_producto(this.idProducto).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El producto fue eliminado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/productos']);
            });
          },
          error: error => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }
}
