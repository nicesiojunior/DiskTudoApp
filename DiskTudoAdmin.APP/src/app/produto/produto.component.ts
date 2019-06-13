import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../_models/Produto';
import { ProdutoService } from '../_services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  form: FormGroup;
  produto: Produto;

  constructor(private produtoService: ProdutoService,
              public formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.validation();
  }



  validation() {
    this.form = this.formBuilder.group({
      nomeProduto: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  register() {
    if (this.form.valid) {
      this.produto = Object.assign({nomeProduto: this.form.get('nomeProduto').value}, this.form.value);
      this.produtoService.registerProduto(this.produto).subscribe(
        () => {
          this.router.navigate(['/produto']);
          console.log('Cadastro Realizado');
        },
        error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                console.log('Produto Duplicado');
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
