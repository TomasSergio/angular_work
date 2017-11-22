import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { MatSnackBar, MatDialog } from '@angular/material';

import 'rxjs/add/operator/switchMap';
import {window} from "rxjs/operator/window";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  model: Product= <Product>{};
  status = true;
  error_img = false;
  mock_product: Product = {
      id: 1,
      name: 'Jungle Kai',
      price: 12,
      image: './assets/images/product_1.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim facilis incidunt inventore ipsum molestias nemo nisi possimus quos sit ullam? Culpa debitis dolor dolorum maxime, pariatur praesentium quos repellat voluptas.'
    };
  state = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.productService.getProduct(+params.get('id'))).subscribe(
        res => {
          if (!res[0]) {
            this.router.navigate(['/']);
            return false;
          }
          this.model = res[0];
        },
        err => this.router.navigate(['/'])
    );
  }

  edit() {
    if (!this.status) return;
    if (this.status && this.state) {
      this.productService.editProduct(this.model).subscribe(
        res => {
          this.snackBar.open(res, 'Edited', {
            duration: 2000,
          });
        },
        err => console.log(err)
      );
    }
    this.state = !this.state;
  }

  form_status = status => this.status = status;

  delete_product() {
    const dialogref = this.dialog.open(ConfirmDeleteComponent);
    dialogref.afterClosed().subscribe(result => {
      if(result){
        this.productService.deleteProduct(this.model.id).subscribe(
          res => {
            const snackBarRef = this.snackBar.open(res, 'Deleted', {
              duration: 1000,
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.router.navigate(['/']);
            });
          },
          err => console.log(err)
        );
      }
    });
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
    reader.onload = e => {
      this.model.image = e.target['result'];
    };
    reader.readAsDataURL(file);
  }

  go_back = () => this.location.back();
}

// Dialog component
@Component({
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Yes</button>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
    </div>
  `,
  styles: [`
      h1{
        text-align: center;
      }
  `]
})
export class ConfirmDeleteComponent {}
