import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { Unidades } from '../../models/unidades.models';

const base_url = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  

  private transformarUnidad( resultados: any[] ) {
    return resultados;  
  }

 
  buscar( 
      tipo: 'unidades'|'subareas'|'areas'|'productos',
      termino: string
    ) {

    const url = `${ base_url }/api/${ tipo }/find/${ termino }`;
    return this.http.get<any[]>( url )
            .pipe(
              map( (resp: any ) => { 

                switch ( tipo ) {
                  case 'unidades':
                    return this.transformarUnidad( resp.resultados );
                
                  default:
                    return [];
                }

              })
            );

  }


}
