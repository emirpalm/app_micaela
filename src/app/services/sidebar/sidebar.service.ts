import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class SidebarService {
    menu: any = [
        {
            titulo: "Principal",
            icono: "mdi mdi-gauge",
            submenu: [
                { titulo: "Dashboard", url: "/dashboard" }
            ]
        },
        {
            titulo: "Mantenimiento",
            icono: "mdi mdi-gauge",
            submenu: [
                { titulo: "Productos", url: "productos" },
                { titulo: "Areas", url: "areas" },
                { titulo: "SubAreas", url: "subareas" },
                { titulo: "Unidades", url: "unidades" }
            ]
        }
    ];
    constructor() {}
    cargarMenu() {
        return this.menu;
    }
}