import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ModelPosteo } from '../../modelo/usuario';
import { PosteoService } from 'src/app/services/posteo.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router, public posteoService: PosteoService) { }
  posteoList: ModelPosteo[];
  buscar: string;

  logout() {
    localStorage.removeItem('logeo');
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {
    this.MostrarPosteo();
    const ls = localStorage.getItem('logeo');
    if (ls != "true") {
      this.router.navigateByUrl('/login');
    }
  }

  //COMIENZA MI CRUD
  MostrarPosteo() {
    this.posteoService.getPosteos().snapshotChanges().subscribe(item => {
      this.posteoList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"] = element.key;
        this.posteoList.push(x as ModelPosteo);
      });
    });
  }

  consulPosteo() {

    this.posteoService.getPosteos().snapshotChanges().subscribe(item => {
      this.posteoList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"] = element.key;
        this.posteoList.push(x as ModelPosteo);
      });


      this.posteoList = this.posteoList.filter(data => {
        return data.tipo.toString().trim() === this.buscar;
      })

      if (this.posteoList.length === 0) {

        this.MostrarPosteo();

        Swal.fire({
          text: '¡FALLO!',
          title: 'Tipo no encontrado',
          timer: 1500
        })
      } else {
        Swal.fire({
          text: 'Ok',
          title: 'Tipo encontrado',
          timer: 1500
        })
      }

    });

  }



  onEdit(posteo: ModelPosteo) {
    this.posteoService.selectedPosteo = posteo;
  }


  onDelete($key: string) {
    this.posteoService.deletePosteo($key);
  }


  onSubmit(posteoForm: NgForm) {

    this.posteoService.getPosteos();

    if (posteoForm.value.$keyRegistro == null) {
      this.posteoService.insertPosteo(posteoForm.value);
      Swal.fire({
        text: 'Ok',
        title: 'Creado con exito',
        timer: 1500
      })
      posteoForm.resetForm();
    } else {
      this.posteoService.updatePosteo(posteoForm.value);
      Swal.fire({
        text: 'Ok',
        title: 'Modificado con exito',
        timer: 1500
      })      
      posteoForm.resetForm();
    }

  }

}
