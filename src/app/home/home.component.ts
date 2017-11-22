import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (res: Product[]) => this.products = res,
      err => console.log(err)
    );
  }

  restart() {
    window.localStorage.removeItem('products');
    window.location.reload();
  }
}
