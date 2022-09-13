import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreasComponent } from './mantenimientos/areas/areas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { SubareasComponent } from './mantenimientos/subareas/subareas.component';
import { UnidadesComponent } from './mantenimientos/unidades/unidades.component';

const routes: Routes = [
    { path: 'dashboard', 
    component: PagesComponent, 
    children: [
    { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },

    // Mantenimientos
    { path: 'productos', component: ProductosComponent,data: { titulo: 'Productos' } },
    { path: 'areas', component: AreasComponent, data: { titulo: 'Areas' } },
    { path: 'subareas', component: SubareasComponent,data: { titulo: 'SubAreas' } },
    { path: 'unidades', component: UnidadesComponent, data: { titulo: 'Unidades' } },
  ] },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
