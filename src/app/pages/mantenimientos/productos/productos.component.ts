import { Component, OnInit } from '@angular/core';


import { Productos } from '../../../models/productos.models';
import { Unidades } from '../../../models/unidades.models';
import { ProductoService, UnidadService, BusquedasService } from '../../../services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos: Productos[] = [];
  public unidades: Unidades[] = [];
  public cargando: boolean = true;
  public total: number = 0;
  public page: number = 1;

  constructor(private _unidadService: UnidadService, private _productoService: ProductoService, private _busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarProductos();
    this._unidadService.getAllUnidades()
    .subscribe( (resp: any) => {
      this.unidades = resp.rows;
    } );
  }

  searchProducto(termino: string) {
    if(termino.length === 0) {
      return this.cargarProductos();
    }
    this._busquedaService.buscar('productos', termino)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.productos = resp;
    } );
  }

  cargarProductos(page: number = 1) {
    this.cargando = true;
    this._productoService.getAllProductos(page)
    .subscribe( (resp: any) => {
      this.productos = resp.rows;
      this.total = resp.count;
      this.cargando = false;
    } );
  }

  updatedProducto(producto: Productos) {
    const id: number = producto.id!;
    const name: string = producto.nombre!;
    const precio: number = producto.precio!;
    const unidad_id: number = producto.unidad_id;
    this._productoService.updateProducto(id, name, precio, unidad_id)
    .subscribe( (resp: any) => {
      this.cargarProductos();
      Swal.fire({
        title: 'Actualizado!',
        text: producto.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteProducto(producto: Productos) {
    const id: number = producto.id!;
    this._productoService.deleteProducto(id)
    .subscribe( (resp: any) => {
      this.cargarProductos();
      Swal.fire({
        title: 'Borrado!',
        text: producto.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateProducto() {
    const items = this.unidades.map(unidad => ({  id: unidad.id, name: unidad.nombre }));
    const inputOptions = new Map
    items.forEach(item => inputOptions.set(item.id, item.name));
    Swal.fire({
      title: 'Crear Producto',
      input: 'select',
      inputOptions: inputOptions,
      html: `<input type="text" id="nameProducto" class="swal2-input" placeholder="Nombre del producto">
      <input type="text" id="precio" class="swal2-input" placeholder="Precio del producto">`,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: (inputValue) => {
        const name: string = (<HTMLInputElement>document.getElementById("nameProducto")).value;
        const precio: string = (<HTMLInputElement>document.getElementById("precio")).value;
        const unidad_id = inputValue;
        if (!name) {
          Swal.showValidationMessage(`Porfavor, debes ingresar un nombre`)
        }
    return { name: name, precio: precio, unidad_id: unidad_id }
  }
}).then((result) => {
  if (result.isConfirmed == true) {
    this._productoService.createProducto(String(result.value?.name), Number(result.value?.precio), Number(result.value?.unidad_id))
    .subscribe( (resp: any) => {
      this.cargarProductos();
    } );
    Swal.fire({
      title: 'Creado!',
      text: 'El SubArea ha sido creada con éxito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
  }
});
  }

  changePage(value: number) {
    this.page += value;
    const limit = Math.ceil(this.total/5);
    if(this.page < 1) {
      this.page = 1;
    } else if (this.page > limit) {
      this.page -= value;
    }
    this.cargarProductos(this.page);
  }

}
