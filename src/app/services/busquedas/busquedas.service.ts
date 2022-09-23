import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { Unidades } from '../../models/unidades.models';
import { SubAreas } from '../../models/subareas.models';
import { Areas } from '../../models/areas.models';
import { Productos } from '../../models/productos.models';

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

  

  private transformarUnidad( resultados: any[] ): Unidades[]  {
    return resultados;
   
  }

  private transformarSubAreas( resultados: any[] ): SubAreas[]  {
    return resultados;
   
  }

  private transformarAreas( resultados: any[] ): Areas[]  {
    return resultados;
   
  }

  private transformarProductos( resultados: any[] ): Productos[]  {
    return resultados;
   
  }

  busquedaGlobal( termino: string ) {

    const url = `${ base_url }/api/all/search/${ termino }`;
    return this.http.get(url);

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
                  case 'subareas':
                    return this.transformarSubAreas( resp.resultados );
                  case 'areas':
                    return this.transformarAreas( resp.resultados );
                  case 'productos':
                    return this.transformarProductos( resp.resultados );
                
                  default:
                    return [];
                }

              })
            );

  }


}
