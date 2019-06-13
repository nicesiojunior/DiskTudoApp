import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../_models/Categoria';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { CategoriaService } from '../_services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  form: FormGroup;
  categoria: Categoria;

  constructor(private categoriaService: CategoriaService,
              public formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.form = this.formBuilder.group({
      nomeCategoria: ['', Validators.required]
    });
  }

  register() {
    if (this.form.valid) {
      this.categoria = Object.assign({nomeCategoria: this.form.get('nomeCategoria').value}, this.form.value);
      this.categoriaService.registerCategoria(this.categoria).subscribe(
        () => {
          this.router.navigate(['/categoria']);
          console.log('Cadastro Realizado');
        },
        error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                console.log('Categoria Duplicada');
                break;

              default:
                console.log('Erro no cadastro!! CODE: ${element.code}');
                break;
            }
        });
        }
      );
    }
  }
}
