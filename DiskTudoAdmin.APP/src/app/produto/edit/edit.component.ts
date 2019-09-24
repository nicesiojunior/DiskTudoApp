import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from 'src/app/_models/Produto';
import { ProdutoService } from 'src/app/_services/produto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  produto: Produto = new Produto();
  produtoFilter: Produto;
  qtdade: 1;
  file: File;
  arrayFiltrado: any;
  fileNameToUpdate: string;
  imagemUrl: string;

  constructor(private produtoService: ProdutoService,
              public formBuilder: FormBuilder,
              private router: Router,
              private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.validation();
    this.carregarProduto();
  }

  carregarProduto() {
    // this.arrayFiltrado = [];
    // tslint:disable-next-line:radix
    const id = parseInt(this.actRouter.snapshot.paramMap.get('id'));
    // tslint:disable-next-line:variable-name
    this.produtoService.getProdutoById(id).subscribe((produto: Produto) => {
      this.produto = Object.assign({}, produto);
      this.fileNameToUpdate = produto.imagemURL.toString();

      this.imagemUrl = 'http://localhost:5000/resources/images/${this.produto.imagemURL}';

      this.produto.imagemURL = '';

      this.form.patchValue(this.produto);

      console.log(this.produto);
      // tslint:disable-next-line:prefer-const
      // let teste = [];
      // teste.push(produto);
      // teste.forEach(element => {
      //   this.arrayFiltrado = element.filter(data => {
      //     // tslint:disable-next-line:triple-equals
      //     return data.id == id;
      //   });
      //   this.produto = this.arrayFiltrado;
      //   console.log(this.produto);
      // });
      // tslint:disable-next-line:triple-equals
    });

  }

  salvarProduto() {
    this.produto = Object.assign({id: this.produto.id}, this.form.value);

    this.produtoService.postUpload(this.file).subscribe();

    const nomeArquivo = this.produto.imagemURL.split('\\', 3);
    this.produto.imagemURL = nomeArquivo[2];

    this.produtoService.putProduto(this.produto).subscribe(() => {
      console.log('Editado com sucesso');
    });
  }

  uploadImagem() {
    if (this.form.get('imagemUrl').value !== '') {
      this.produtoService.postUpload(this.file).subscribe(() => {
        this.imagemUrl = 'http://localhost:5000/resources/images/${this.produto.imagemURL}';
      });
    }


  }

  validation() {
    this.form = this.formBuilder.group({
      id: [this.produto.id],
      nomeProduto: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      imagemURL: ['']
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

    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => this.imagemUrl = event.target.result;

    this.file = event.target.files;

    reader.readAsDataURL(this.file[0]);

  }

}
