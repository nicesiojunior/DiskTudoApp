import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UserComponent } from './User/User.component';
import { LogiinComponent } from './User/Logiin/Logiin.component';
import { RegistrationnComponent } from './User/registrationn/registrationn.component';
import { DataResolverService } from './resolver/data-resolver.service';
import { CarrinhoComponent } from './carrinho/carrinho.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },

  { path: 'user', component: UserComponent,
    children: [
      { path: 'logiin', component: LogiinComponent},
      { path: 'login', component: LogiinComponent},
      { path: 'registration', component: RegistrationnComponent},
      { path: 'registrationn', component: RegistrationnComponent}
    ]
  },
  { path: 'produto', component: ProdutoComponent},
  { path: 'produto/:id',
    resolve: {
      special: DataResolverService
    }, component: ProdutoComponent},
  { path: 'pedido', component: PedidoComponent},
  { path: 'categoria', component: CategoriaComponent},
  { path: 'carrinho', component: CarrinhoComponent},
  { path: '', redirectTo: 'produto', pathMatch: 'full'},
  { path: '**', redirectTo: 'produto', pathMatch: 'full'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
