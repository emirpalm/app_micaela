import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { AreasComponent } from './mantenimientos/areas/areas.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { UnidadesComponent } from './mantenimientos/unidades/unidades.component';
import { SubareasComponent } from './mantenimientos/subareas/subareas.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductosComponent,
    AreasComponent,
    PagesComponent,
    UnidadesComponent,
    SubareasComponent,
    BusquedaComponent
  ],
  exports: [
    DashboardComponent, 
    ProductosComponent, 
    AreasComponent,
    PagesComponent,
    UnidadesComponent,
    SubareasComponent,
    BusquedaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class PagesModule { }
