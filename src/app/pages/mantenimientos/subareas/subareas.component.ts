import { Component, OnInit } from '@angular/core';

import { SubAreas } from '../../../models/subareas.models';
import { Areas } from '../../../models/areas.models';
import { SubAreaService, AreaService, BusquedasService } from '../../../services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subareas',
  templateUrl: './subareas.component.html',
  styleUrls: ['./subareas.component.css']
})
export class SubareasComponent implements OnInit {

  public subAreas: SubAreas[] = [];
  public areas: Areas[] = [];
  public cargando: boolean = true;
  public total: number = 0;
  public page: number = 1;

  constructor(private _areasService: AreaService, private _subAreaService: SubAreaService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarSubAreas();
    this._areasService.getAllAreas()
    .subscribe( (resp: any) => {
      this.areas = resp.rows;
    } );
  }

  searchSubArea(termino: string) {
    if(termino.length === 0) {
      return this.cargarSubAreas();
    }
    this.busquedaService.buscar('subareas', termino)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.subAreas = resp;
    } );
  }

  cargarSubAreas(page: number = 1) {
    this.cargando = true;
    this._subAreaService.getAllSubAreas(page)
    .subscribe( (resp: any) => {
      this.subAreas = resp.rows;
      this.total = resp.count;
      this.cargando = false;
    } );
  }

  updatedSubArea(subArea: SubAreas) {
    const id: number = subArea.id!;
    const name: string = subArea.nombre!;
    const area_id: number = subArea.area_id;
    this._subAreaService.updateSubArea(id, name, area_id)
    .subscribe( (resp: any) => {
      this.cargarSubAreas();
      Swal.fire({
        title: 'Actualizado!',
        text: subArea.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteSubArea(subArea: SubAreas) {
    const id: number = subArea.id!;
    this._subAreaService.deleteSubArea(id)
    .subscribe( (resp: any) => {
      this.cargarSubAreas();
      Swal.fire({
        title: 'Borrado!',
        text: subArea.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateSubArea() {
    const items = this.areas.map(area => ({  id: area.id, name: area.nombre }));
    const inputOptions = new Map
    items.forEach(item => inputOptions.set(item.id, item.name));
    Swal.fire({
      title: 'Crear SubArea',
      input: 'select',
      inputOptions: inputOptions,
      html: '<input type="text" id="nameSubArea" class="swal2-input" placeholder="Nombre del SubArea">',
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: (inputValue) => {
        const name: string = (<HTMLInputElement>document.getElementById("nameSubArea")).value;
        const id_area = inputValue;
        if (!name) {
          Swal.showValidationMessage(`Porfavor, debes ingresar un nombre`)
        }
    return { name: name, id_area: id_area }
  }
}).then((result) => {
  if (result.isConfirmed == true) {
    this._subAreaService.createSubArea(String(result.value?.name), Number(result.value?.id_area))
    .subscribe( (resp: any) => {
      this.cargarSubAreas();
    } );
    Swal.fire({
      title: 'Creado!',
      text: 'El SubArea ha sido creada con éxito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
  }
});
  }

  changePage(value: number) {
    this.page += value;
    const limit = Math.ceil(this.total/5);
    if(this.page < 1) {
      this.page = 1;
    } else if (this.page > limit) {
      this.page -= value;
    }
    this.cargarSubAreas(this.page);
  }

}
