import { Component } from '@angular/core';
import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent {
  model: Product = <Product>{};
  load_btn_text = 'Add image';
  error_img = false;
  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  add_product(f: HTMLFormElement) {
    this.model.id = Date.now();
    this.productService.addProduct(this.model).subscribe(
      (res: string) => {
        this.model = <Product>{};
        f.reset();
        this.load_btn_text = 'Add image';
        this.snackBar.open(res, 'Added', {
          duration: 2000,
        });
      },
      err => console.log(err)
    );
  }

  load_image(event) {
    const file = event.target.files[0];
    if (file.type.indexOf('image') >= 0) {
      this.error_img = false;
    } else {
      this.error_img = true;
      setTimeout(() => this.error_img = false , 3000);
      return false;
    }
    const reader = new FileReader();
    this.load_btn_text = file.name;
    reader.onload = e => {
      this.model.image = e.target['result'];
    };
    reader.readAsDataURL(file);
  }
}
