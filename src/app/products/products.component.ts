import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ICartItem } from './cart-item';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';
  cartCount = 0;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  cartItems: ICartItem[] = [];

  constructor(private productService: ProductService,private _router: Router) {

  }

  openCart(): void{
    this._router.navigate(['/cart']);
  }

  addToCart(productId: number): void {
    let itemExisting: boolean = false;
    this.cartItems.forEach(function(item) {
      if(item.productId == productId){
        item.quantity++;
        itemExisting = true;
        return false;
      }
    });
    if(!itemExisting) {
      let item: ICartItem = {productId:productId,quantity:1};
      this.cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    console.log(this.cartItems);
    this.cartCount++;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }
}
