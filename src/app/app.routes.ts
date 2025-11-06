import { Routes } from '@angular/router';
import { Producto } from './productos/productos';
import { Menu } from './menu/menu';
import { Error } from './error/error';

export const routes: Routes = [
    {path: "", component:Menu},
    {path: "Productos", component:Producto },
    {path: "**", component:Error }
];

