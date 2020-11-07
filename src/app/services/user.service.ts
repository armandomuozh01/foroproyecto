import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelUsuario } from '../modelo/usuario';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {
  constructor(private httpClient: HttpClient) { }

  private url = 'https://listenus-f9980.firebaseio.com';

  registrarUsuario(usuario : ModelUsuario){
    return this.httpClient.post(`${this.url}/usuarios.json`, usuario);
  }

  veririficarUsuario(usuario : ModelUsuario){
    return this.httpClient.get(`${this.url}/usuarios.json`).pipe(
      map(
        this.jsonToArray
      )
    );
  }

  jsonToArray(json: Object){
    const usuarios: ModelUsuario[] = [];
    if (json === null) {
      return []; 
    }

    Object.keys(json).forEach(item => {
      const usuario: ModelUsuario = json[item];
      usuario.id = item;
      usuarios.push(usuario);
    });

    return usuarios;


  }
}

























//import { Injectable } from '@angular/core';
//import {Usuario} from '../modelo/usuario';
//import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';


//@Injectable({
  //providedIn: 'root'
//})
//export class UserService {

//  selectedUsuario: Usuario = new Usuario();
//  usuariosList: AngularFireList<any>;

//  constructor(private firebase: AngularFireDatabase) { }

//  getUsuario(){
//    return this.usuariosList = this.firebase.list('usuarios');
//  }

//  registrarUsuario(usuario: Usuario){
//    this.usuariosList.push({
//    nombre: usuario.nombre,
//    matricula: usuario.matricula,
//    cuatrimestre: usuario.cuatrimestre,
//    grupo: usuario.grupo,
//    carrera: usuario.carrera,
//    password: usuario.password
//    });
//  }
//}
