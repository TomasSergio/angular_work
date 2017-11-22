import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { MaterialModules } from './_modules/material.module';
import { AppRoutingModule } from './_modules/routing.module';

import { ProductService } from './_services/product.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent, ConfirmDeleteComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';

// mock backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { fakeBackendProvider } from './_mock_backend/mock_backend.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    AddProductComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules
  ],
  providers: [
    ProductService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  entryComponents: [
    ConfirmDeleteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
