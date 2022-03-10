import { ParseTreeResult } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [

  {path: 'home', component: ProductsComponent},
  {path:'about',component:AboutComponent},
  {path:'productPage', component:ProductPageComponent},
  {path:'**', pathMatch:'full', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
