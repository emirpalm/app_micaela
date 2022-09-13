import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';

import {
    SidebarService,
    UnidadService,
    AreaService,
    BusquedasService
   } from './service.index';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SidebarService,
        UnidadService,
        AreaService,
        BusquedasService
    ],
    declarations: []
  })

  export class ServiceModule { }
