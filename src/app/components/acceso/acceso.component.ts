import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';


//const Swal = require('sweetalert2')
import Swal from 'sweetalert2';



@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',  
})
export class AccesoComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
     // Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');

      Swal.fire({
        title: 'Login!',
        text: `Hola ${this.authService.usuario.username} ya estás autenticado!`,
        icon: 'info',
        confirmButtonColor: '#48cc53',
        confirmButtonText: "Aceptar",
        heightAuto: false    
        })

      this.router.navigate(['/inicio']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
     // Swal.fire('Error Login', 'Username o password vacías!', 'error');
      Swal.fire({
        title: 'Error Login',
        text: `Username o password vacías!`,
        icon: 'error',
        confirmButtonColor: '#48cc53',
        confirmButtonText: "Aceptar",
        heightAuto: false    
        });
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/inicio']);
      //Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');

      Swal.fire({
        title: 'Login',
        text: `Hola ${usuario.username}, has iniciado sesión con éxito!`,
        icon: 'success',
        confirmButtonColor: '#48cc53',
        confirmButtonText: "Aceptar",
        heightAuto: false    
        });


    }, err => {
      if (err.status == 400) {
        //Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        Swal.fire({
          title: 'Error Login',
          text: `Usuario o clave incorrectas!`,
          icon: 'error',
          confirmButtonColor: '#48cc53',
          confirmButtonText: "Aceptar",
          heightAuto: false    
          });
        
      }
    }
    );
  }


}