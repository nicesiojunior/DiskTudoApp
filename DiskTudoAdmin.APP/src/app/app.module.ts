import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TooltipModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoComponent } from './produto/produto.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProdutoService } from './_services/produto.service';
import { CategoriaService } from './_services/categoria.service';
import { PedidoService } from './_services/pedido.service';
import { from } from 'rxjs';

@NgModule({
   declarations: [
      AppComponent,
      ProdutoComponent,
      PedidoComponent,
      CategoriaComponent
   ],
   entryComponents: [],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      StatusBar,
      SplashScreen,
      ProdutoService,
      CategoriaService,
      PedidoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
