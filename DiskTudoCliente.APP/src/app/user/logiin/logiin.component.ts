import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-logiin',
  templateUrl: './logiin.component.html',
  styleUrls: ['./logiin.component.css']
})
export class LogiinComponent implements OnInit {

  titulo: 'Login';
  model: any = {};
  constructor(private authService: AuthService,
              public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/produto']);
    }
  }

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['/produto']);
      },
      error => {
        console.log('Falha ao logar');
      }
    );
  }

}
