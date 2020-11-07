import { Component, OnInit } from '@angular/core';
import { ModelUsuario } from '../../modelo/usuario';
import { FirebaseserviceService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: FirebaseserviceService, private router: Router) { }

  usuario: ModelUsuario = new ModelUsuario();

  guardar(){
    this.service.registrarUsuario(this.usuario).subscribe((response: any) => {
      console.log(this.usuario);
      Swal.fire({
        text: 'Ok',
        title: 'Creado con exito!',
        timer: 1500
      })
      this.router.navigateByUrl('/login');
    });
  }
  ngOnInit(): void {
  }

}