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
import { UserComponent } from './User/User.component';
import { LogiinComponent } from './User/Logiin/Logiin.component';
import { RegistrationnComponent } from './User/registrationn/registrationn.component';
import { NavComponent } from './nav/nav.component';
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { ProdutoService } from './_services/produto.service';
import { from } from 'rxjs';
import { CarrinhoComponent } from './carrinho/carrinho.component';

@NgModule({
   declarations: [
      AppComponent,
      ProdutoComponent,
      PedidoComponent,
      CategoriaComponent,
      UserComponent,
      LogiinComponent,
      RegistrationnComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      ProdutoComponent,
      CarrinhoComponent
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
      ProdutoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
