import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CreateComponent } from './produto/create/create.component';
import { EditComponent } from './produto/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'produto', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'produto', component: ProdutoComponent},
  { path: 'produto/create', component: CreateComponent},
  { path: 'produto/:id/edit', component: EditComponent},
  { path: 'pedido', component: PedidoComponent},
  { path: 'categoria', component: CategoriaComponent},
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
