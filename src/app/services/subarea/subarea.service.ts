import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class SubAreaService {
   
    
    constructor(public http: HttpClient) {}

      getAllSubAreas(page: number = 1) {
        const URL = `${environment.apiUrl}/api/subareas/list?page=${page}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      findSubArea(nombre: string) {
        const URL = `${environment.apiUrl}/api/subareas/find/subarea/${nombre}`;
        return this.http.get(URL).pipe(map( (resp: any) => resp));
      }

      createSubArea(nombre: string, area_id: number) {
        const URL = `${environment.apiUrl}/api/subareas/create`;
        return this.http.post(URL, {nombre: nombre, area_id: area_id }).pipe(map( (resp: any) => resp));
      }

      updateSubArea(id: number, nombre: string, area_id: number) {
        const URL = `${environment.apiUrl}/api/subareas/update/subarea/${id}`;
        return this.http.put(URL, {nombre: nombre, area_id}).pipe(map( (resp: any) => resp));
      }

      deleteSubArea(id: number) {
        const URL = `${environment.apiUrl}/api/subareas/delete/subarea/${id}`;
        return this.http.delete(URL).pipe(map( (resp: any) => resp));
      }
   
   
}