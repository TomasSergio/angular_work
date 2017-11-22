import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';
import { mock_products } from '../_mocks/mock_products';

export function fakeBackendFactory (backend: MockBackend, options: BaseRequestOptions) {
  const storage = window.localStorage;
  backend.connections.subscribe((c: MockConnection) => {

    // ADD product
    if (c.request.url === `${environment.host}${environment.product}` && c.request.method === 1) {
      const data = JSON.parse(c.request.getBody()),
            name = data.name;
      let products = JSON.parse(storage.getItem('products')) || [];
      products.push(data);
      products = JSON.stringify(products);
      storage.setItem('products', products);
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(name)
      })));
    }

    // GET products
    if (c.request.url === `${environment.host}${environment.product}` && c.request.method === 0) {
      if (!storage.getItem('products')) {
        storage.setItem('products', JSON.stringify(mock_products));
      }
      const data = JSON.parse(storage.getItem('products'));
      c.mockRespond(new Response(new ResponseOptions({
        body: data
      })));
    }

    // GET product
    if (c.request.url === `${environment.host}${environment.get_product}` && c.request.method === 1) {
      const data = JSON.parse(storage.getItem('products')),
      id = +c.request.getBody();
      const product = data.filter((item) =>  {
        if (item.id === id)  {
          return item;
        }
      });
      c.mockRespond(new Response(new ResponseOptions({
        body: product
      })));
    }

    // DELETE product
    if (c.request.url === `${environment.host}${environment.delete_product}` && c.request.method === 1) {
      const data = JSON.parse(storage.getItem('products')),
            id = +c.request.getBody();
      let name = '',
          index = 0;
      data.forEach((item, i) =>  {
        if (item.id === id) {
          name = item.name;
          index = i;
          return false;
        }
      });
      data.splice(index, 1);
      storage.removeItem('products');
      storage.setItem('products', JSON.stringify(data));
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(name)
      })));
    }

    // EDIT product
    if (c.request.url === `${environment.host}${environment.product}` && c.request.method === 2) {
      const data = JSON.parse(storage.getItem('products')),
        product = JSON.parse(c.request.getBody()),
        name = product.name;
      const new_data = data.map((item, i) =>  item.id === product.id ? product : item );
       storage.removeItem('products');
       storage.setItem('products', JSON.stringify(new_data));
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(name)
      })));
    }
});
  return new Http(backend, options);
}

export let fakeBackendProvider = {
  provide: Http,
  useFactory: fakeBackendFactory ,
  deps: [MockBackend, BaseRequestOptions]
};
