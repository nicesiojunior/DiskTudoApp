import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrationn',
  templateUrl: './registrationn.component.html',
  styleUrls: ['./registrationn.component.css']
})
export class RegistrationnComponent implements OnInit {

  form: FormGroup;
  user: User;
  constructor(private authService: AuthService,
              public router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, {validator : this.compararSenhas}),
      fullName: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]

    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        fb.get('passowrd').setErrors({mismatch: true});
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }

  }

  register() {
    if (this.form.valid) {
      this.user = Object.assign({password: this.form.get('passwords.password').value}, this.form.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          console.log('Cadastro Realizado');
        },
        error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                console.log('Usuario duplicado');
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
