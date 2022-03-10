import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products?: Observable<Product[]>;
  product: Observable<Product> = {} as Observable<Product>;

  //parte del ts para decalrar el formulario
  productForm = new FormGroup({
    productId: new FormControl(''),
    title: new FormControl(''),
    imageUrl: new FormControl(''),
    link: new FormControl(''),
    like: new FormControl(0),
  });
  formButtonText = 'Add product';
  displayProductForm = false;

  constructor(private productService: ProductsService) {
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {}

  addLike(product: Product) {
    product.like++;
    this.productService.updateProduct(product);
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value);
    //Se le pueden pasar parametros por defecto al resetear.
  }
  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }
  updateProduct(id: string) {
    this.productService
      .getProduct(id)
      .subscribe((data) => this.productForm.patchValue(data));
    this.formButtonText = 'Update product';
  }
  updateProductStep2() {
    this.productService.updateProduct(this.productForm.value);
    this.formButtonText = 'Add product';
  }
  formSubmit() {
    this.formButtonText === 'Add product'
      ? this.addProduct()
      : this.updateProductStep2();
      this.displayProductForm = false;
      this.productForm.reset();
  }

}

