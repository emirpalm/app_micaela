import { Component, OnInit } from '@angular/core';
import { Areas } from '../../../models/areas.models';
import { AreaService, BusquedasService } from '../../../services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  public areas: Areas[] = [];
  public cargando: boolean = true;
  public total: number = 0;
  public page: number = 1;

  constructor(private areasService: AreaService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarAreas();
  }

  searchArea(termino: string) {
    if(termino.length === 0) {
      return this.cargarAreas();
    }
    this.busquedaService.buscar('areas', termino)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.areas = resp;
    } );
  }

  cargarAreas(page: number = 1) {
    this.cargando = true;
    this.areasService.getAllAreas(page)
    .subscribe( (resp: any) => {
      this.areas = resp.rows;
      this.total = resp.count;
      this.cargando = false;
    } );
  }

  updatedArea(area: Areas) {
    const id: number = area.id!;
    const name: string = area.nombre!;
    this.areasService.updateArea(id, name)
    .subscribe( (resp: any) => {
      this.cargarAreas();
      Swal.fire({
        title: 'Actualizado!',
        text: area.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteArea(area: Areas) {
    const id: number = area.id!;
    this.areasService.deleteArea(id)
    .subscribe( (resp: any) => {
      this.cargarAreas();
      Swal.fire({
        title: 'Borrado!',
        text: area.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateArea() {
    Swal.fire({
      title: 'Crear Area',
      html: `<input type="text" id="nameArea" class="swal2-input" placeholder="Nombre del Area">`,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const name: string = (<HTMLInputElement>document.getElementById("nameArea")).value
        if (!name) {
          Swal.showValidationMessage(`Porfavor, debes ingresar un nombre`)
        }
    return { name: name }
  }
}).then((result) => {
  if (result.isConfirmed == true) {
    const name: string = result.value?.name !== undefined ? result.value?.name : '';
    this.areasService.createArea(name)
    .subscribe( (resp: any) => {
      this.cargarAreas();
    } );
    Swal.fire({
      title: 'Creado!',
      text: 'El Area ha sido creada con éxito',
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
    console.log(limit);
    if(this.page < 1) {
      this.page = 1;
    } else if (this.page > limit) {
      this.page -= value;
    }
    this.cargarAreas(this.page);
  }

}
