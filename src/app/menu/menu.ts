import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../productos.service';
import { Productos } from '../../producto.model';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  private productosService = inject(ProductosService);

  productos: Productos[] = [];
  categorias: string[] = [];

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.cargar_productos().subscribe({
      next: (data: any) => {
        if (!data) return;
        const productosArray = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          ...value
        }));
        this.productos = productosArray;
        this.categorias = [...new Set(this.productos.map(p => p.categoria))];
      },
      error: err => console.error('Error al cargar productos:', err)
    });
  }

  productosPorCategoria(categoria: string) {
    return this.productos.filter(p => p.categoria === categoria);
  }
}
