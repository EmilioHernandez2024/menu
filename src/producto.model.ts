
export class Productos {
  titulo: string = "";
  descripcion?: string ; 
  precio: number = 0;
  categoria: string = "";

  constructor(titulo: string, descripcion: string, precio: number, categoria: string){
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
  }
}