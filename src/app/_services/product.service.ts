import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

import { Product } from '../_models/product.model';

@Injectable()

export class ProductService {

  constructor(
    private http: Http
  ) { }

  editProduct(product: Product) {
    return this.http.put(environment.host + environment.product, product).map(res => res.json());
  }

  getProducts() {
    return this.http.get(environment.host + environment.product).map(res => res.json());
  }

  addProduct(product: Product) {
    return this.http.post(environment.host + environment.product, product).map(res => res.json());
  }

  getProduct(id: number) {
    return this.http.post(environment.host + environment.get_product, id).map(res => res.json());
  }

  deleteProduct(id: number) {
    // return this.http.delete(environment.host + environment.product, id).map(res => res.json());
    return this.http.post(environment.host + environment.delete_product, id).map(res => res.json());
  }
}
