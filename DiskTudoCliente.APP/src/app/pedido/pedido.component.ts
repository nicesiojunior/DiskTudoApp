import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../_models/Produto';
import { NavController, LoadingController } from '@ionic/angular';
import { Carrinho } from '../_models/Carrinho';
import { PedidoService } from '../_services/pedido.service';
import { Pedido } from '../_models/Pedido';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  arrayFiltrado: any;
  produtos: Produto[];
  teste: any = [];
  data: Carrinho[];
  PedidoCarrinho: Carrinho[];
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  id = 0;
  x = 0;
  pedidos: any;
  constructor(public navCtrl: NavController,
              private router: Router,
              private route: ActivatedRoute,
              public loadingController: LoadingController,
              public pedidoService: PedidoService) {
                this.data = [];
                this.route.queryParams.subscribe(params => {
                if (this.router.getCurrentNavigation().extras.state) {
                  this.data = this.router.getCurrentNavigation().extras.state.itens;
                  console.log('Pedido - Produto', this.data);
                  this.PedidoCarrinho = this.data;
                }
              });
     }


  ngOnInit() {
    this.getPedidos();
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await
      this.loadingController.create({
      duration: 2
    });

    return await loading.present();
  }

  getPedidos() {
    this.arrayFiltrado = [];
    this.arrayFiltrado.item = [];
    this.pedidos = [];
    this.pedidos.item = [];
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:curly
    if (localStorage.getItem('token') != null) {
      const user = localStorage.getItem('token');
      this.decodeToken = this.jwtHelper.decodeToken(user);
      this.teste = this.decodeToken;
      // tslint:disable-next-line:radix
      this.id = parseInt(this.teste.nameid);
      // tslint:disable-next-line:variable-name
      this.pedidoService.getPedidoById(this.teste.nameid).subscribe((_pedido: Pedido[]) => {
        // _pedido.forEach(element => {
          // tslint:disable-next-line:triple-equals
          // if (this.id == element.userId) {
            this.pedidos = _pedido;
            console.log('1° Pedido', this.pedidos);
            this.pedidos.forEach(element => {
              element.item = JSON.parse(element.item);
            });
            console.log('Teste JSON', this.pedidos);

            // this.arrayFiltrado = _pedido.filter(data => {
            //   // tslint:disable-next-line:triple-equals
            //   return data.userId == this.id;
            // });
            // console.log(this.arrayFiltrado);
            // this.pedidos = this.arrayFiltrado;
            // this.pedidos.forEach(element => {
            //   element.item = JSON.parse(element.item);
            // });
            // console.log('Teste JSON', this.pedidos);
          // }
        // });
        // this.pedidos.forEach(element => {
        //   // this.userId = element.userId;
        // // });
        // _pedido.forEach(ped => {
        //   // tslint:disable-next-line:triple-equals
        //   // if (ped.userId == this.teste.nameid) {
        //   //   // tslint:disable-next-line:triple-equals
        //   //   while (ped.userId == this.teste.nameid) {
        //   //     this.pedidos = _pedido;
        //   //   }
        //   // }
        //   // tslint:disable-next-line:prefer-for-of
        //   for (let i = 0; i < _pedido.length; i++) {
        //     // tslint:disable-next-line:triple-equals
        //     if (ped.userId == this.teste.nameid) {
        //       this.pedidos[i] = _pedido[i];
        //     }
        //   }
        // });
        // console.log(this.teste.nameid);
        // console.log(this.pedidos);
      }, error => {
        console.log(error);
      });
    } else {
      this.navCtrl.navigateRoot('/user/login');
    }
  }

}
