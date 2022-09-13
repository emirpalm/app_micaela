import { Component, OnInit } from '@angular/core';
import { Unidades } from '../../../models/unidades.models';
import { UnidadService, BusquedasService } from '../../../services/service.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  public unidades: Unidades[] = [];
  public cargando: boolean = true;

  constructor(private unidadesService: UnidadService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarUnidades();
  }

  searchUnidad(termino: string) {
    if(termino.length === 0) {
      return this.cargarUnidades();
    }
    this.busquedaService.buscar('unidades', termino)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.unidades = resp;
    } );
  }

  cargarUnidades() {
    this.cargando = true;
    this.unidadesService.getAllUnidades()
    .subscribe( (resp: any) => {
      this.unidades = resp;
      this.cargando = false;
    } );
  }

  updatedUnidad(unidad: Unidades) {
    const id: number = unidad.id!;
    const name: string = unidad.nombre!;
    const descripcion: string = unidad.descripcion!;
    this.unidadesService.updateUnidad(id, name, descripcion)
    .subscribe( (resp: any) => {
      this.cargarUnidades();
      Swal.fire({
        title: 'Actualizado!',
        text: unidad.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }


  deleteUnidad(unidad: Unidades) {
    const id: number = unidad.id!;
    this.unidadesService.deleteUnidad(id)
    .subscribe( (resp: any) => {
      this.cargarUnidades();
      Swal.fire({
        title: 'Borrado!',
        text: unidad.nombre,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
    });
    
  }

  openModalCreateUnidad() {
    Swal.fire({
      title: 'Crear Unidad',
      html: `<input type="text" id="nameUnidad" class="swal2-input" placeholder="Nombre de la unidad">
      <input type="text" id="descriptionUnidad" class="swal2-input" placeholder="Descripción de unidad">`,
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const name: string = (<HTMLInputElement>document.getElementById("nameUnidad")).value
        const description: string = (<HTMLInputElement>document.getElementById("descriptionUnidad")).value
        if (!name) {
          Swal.showValidationMessage(`Porfavor, debes ingresar un nombre`)
        }
    return { name: name, description: description }
  }
}).then((result) => {
  if (result.isConfirmed == true) {
    const name: string = result.value?.name !== undefined ? result.value?.name : '';
    const descripcion: string = result.value?.description !== undefined ? result.value?.description : '';
    this.unidadesService.createUnidad(name, descripcion)
    .subscribe( (resp: any) => {
      this.cargarUnidades();
    } );
    Swal.fire({
      title: 'Creado!',
      text: 'La unidad ha sido creada con éxito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    })
  }
});
  }

}
