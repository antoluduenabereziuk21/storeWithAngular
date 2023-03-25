import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../pages/models/product.module';
/*The url of FakeStoreAPI */
const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //import httpCLient for connect with our api
  constructor(private httpClient: HttpClient) { }
  /*generate the method for get all Product,
  but this is a Observabel mehtod of rxjs,
  and we whant pass the limtid of elemtens
  and the tipe sort, and this method return an array of products*/
  getAllProducts(limit = '12',sort ='desc'):Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
    `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    )
  }
}
