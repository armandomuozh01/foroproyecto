import { Injectable } from '@angular/core';
import { ModelPosteo } from '../modelo/usuario';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PosteoService {
  selectedPosteo: ModelPosteo = new ModelPosteo();
  posteoList: AngularFireList<any>;


  constructor(private firebase: AngularFireDatabase) { }

  getPosteos() {
    return this.posteoList = this.firebase.list('post');
  }


  insertPosteo(posteo: ModelPosteo) {

    this.posteoList.push({
      titulo: posteo.titulo,
      cuerpo: posteo.cuerpo,
      tipo: posteo.tipo
    });
  }

  updatePosteo(posteo: ModelPosteo) {
    this.posteoList.update(posteo.$keyRegistro, {
      titulo: posteo.titulo,
      cuerpo: posteo.cuerpo,
      tipo: posteo.tipo
    });
  }

  deletePosteo($keyRegistro: string) {
    this.posteoList.remove($keyRegistro);
  }


}
