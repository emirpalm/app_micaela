import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class UnidadService {
   
    
    constructor(public http: HttpClient) {}

      getAllUnidades() {
        const URL = `${environment.apiUrl}/api/unidades/list`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findUnidad(nombre: string) {
        const URL = `${environment.apiUrl}/api/unidades/find/unidad/${nombre}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createUnidad(nombre: string, descripcion: string) {
        const URL = `${environment.apiUrl}/api/unidades/create`;
        return this.http.post(URL, {nombre: nombre, descripcion: descripcion}).pipe(map( (resp: any) => resp));
      }

      updateUnidad(id: number, nombre: string, descripcion: string) {
        const URL = `${environment.apiUrl}/api/unidades/update/unidad/${id}`;
        return this.http.put(URL, {nombre: nombre, descripcion: descripcion}).pipe(map( (resp: any) => resp));
      }

      deleteUnidad(id: number) {
        const URL = `${environment.apiUrl}/api/unidades/delete/unidad/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}