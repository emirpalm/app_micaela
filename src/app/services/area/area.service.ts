import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class AreaService {
   
    
    constructor(public http: HttpClient) {}

      getAllAreas(page: number = 1) {
        const URL = `${environment.apiUrl}/api/areas/list?page=${page}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findArea(nombre: string) {
        const URL = `${environment.apiUrl}/api/areas/find/area/${nombre}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createArea(nombre: string) {
        const URL = `${environment.apiUrl}/api/areas/create`;
        return this.http.post(URL, {nombre: nombre}).pipe(map( (resp: any) => resp));
      }

      updateArea(id: number, nombre: string) {
        const URL = `${environment.apiUrl}/api/areas/update/area/${id}`;
        return this.http.put(URL, {nombre: nombre}).pipe(map( (resp: any) => resp));
      }

      deleteArea(id: number) {
        const URL = `${environment.apiUrl}/api/areas/delete/area/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}