import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';

import {
    SidebarService,
    UnidadService,
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
        BusquedasService
    ],
    declarations: []
  })

  export class ServiceModule { }
