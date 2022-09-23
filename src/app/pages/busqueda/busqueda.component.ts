import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/service.index';

//models
import { Productos } from '../../models/productos.models';
import { Areas } from '../../models/areas.models';
import { SubAreas } from '../../models/subareas.models';
import { Unidades } from '../../models/unidades.models';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public productos: Productos[] = [];
  public areas: Areas[] = [];
  public subAreas: SubAreas[] = [];
  public unidades: Unidades[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));

  }

  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.productos   = resp.productos;
          this.areas    = resp.areas;
          this.subAreas = resp.subareas;
          this.unidades = resp.unidades;
        });

  }

}
