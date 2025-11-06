import { Routes } from '@angular/router';
import { Producto } from './productos/productos';
import { Menu } from './menu/menu';
import { Error } from './error/error';
import { ProductosEditables } from './productos-editables/productos-editables';

export const routes: Routes = [
    {path: "", component:Menu},
    {path: "productos", component:Producto },
    { path: 'productos/editar/:id', component: ProductosEditables },
    {path: "**", component:Error }
];

