import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../products/cart-item';
import { IProduct } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  products: IProduct[] = [];
  errorMessage: string;
  imageWidth = 50;
  imageMargin = 2;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log(localStorage.getItem('cartItems'));
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
      },
      error => this.errorMessage = <any>error
    );

  }

  getQuantity(productId): number{
    let quantity = 0;
    this.cartItems.forEach(function(item){
        if(item.productId == productId){
          quantity= item.quantity;
        }
    });
    return quantity;
  }

}
