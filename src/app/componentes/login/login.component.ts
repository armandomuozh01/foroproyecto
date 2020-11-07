import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ModelUsuario } from '../../modelo/usuario';
import { FirebaseserviceService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: FirebaseserviceService, private router: Router) { }
  usuario: ModelUsuario = new ModelUsuario();
  existe: boolean;

  login(form: NgForm) {
    this.existe = false;
    this.service.veririficarUsuario(this.usuario).subscribe((res: any) => {
      for (const item of res) {
        if (item.matricula === this.usuario.matricula &&
          item.contra === this.usuario.contra
        ) {
          this.existe = true;
          localStorage.setItem("logeo", this.existe.toString());
          break;
        }
      }
      if (this.existe) {
        this.router.navigateByUrl('/principal');
      } else {
        Swal.fire({
          text: '¡FALLO!',
          title: 'Matricula o contraseña incorrectos!',
          timer: 1500
        }),
          form.resetForm();
      }
    });
  }


  ngOnInit(): void {
    const ls = localStorage.getItem('logeo');
    if (ls == "true") {
      this.router.navigateByUrl('/home');
    }
  }



}

