import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class ProductoService {
   
    
    constructor(public http: HttpClient) {}

      getAllProductos(page: number = 1) {
        const URL = `${environment.apiUrl}/api/productos/list?page=${page}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findProducto(nombre: string) {
        const URL = `${environment.apiUrl}/api/productos/find/producto/${nombre}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createProducto(nombre: string, precio: number, unidad_id: number) {
        const URL = `${environment.apiUrl}/api/productos/create/producto`;
        return this.http.post(URL, {nombre: nombre, precio: precio, unidad_id: unidad_id }).pipe(map( (resp: any) => resp));
      }

      updateProducto(id: number, nombre: string, precio: number, unidad_id: number) {
        const URL = `${environment.apiUrl}/api/productos/update/producto/${id}`;
        return this.http.put(URL, {nombre: nombre, precio: precio, unidad_id: unidad_id}).pipe(map( (resp: any) => resp));
      }

      deleteProducto(id: number) {
        const URL = `${environment.apiUrl}/api/productos/delete/producto/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}