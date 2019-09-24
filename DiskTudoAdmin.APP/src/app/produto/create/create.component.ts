import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/_services/produto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from 'src/app/_models/Produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  produto: Produto;
  qtdade: 1;
  file: File;

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
      valor: ['', Validators.required],
      imagemURL: ['', Validators.required]
    });
  }

  register() {
    if (this.form.valid) {
      this.produto = Object.assign({}, this.form.value);

      this.produtoService.postUpload(this.file).subscribe();

      const nomeArquivo = this.produto.imagemURL.split('\\', 3);
      this.produto.imagemURL = nomeArquivo[2];

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

  onFileChanged(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
    }
  }


}
