import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { DetailPage } from '../detail/detail';
import { IndexPage } from '../index/index';
import { LoginPage } from '../login/login';
import { NotfoundPage  } from '../notfound/notfound';
import { OrderConfirmPage} from '../order-confirm/order-confirm';
import{ PayPage } from '../pay/pay';
import {UserCenterPage} from '../user-center/user-center'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   tabIndex=IndexPage;
   tabCart=CartPage;
   tabNF=NotfoundPage ;
   tabUser=UserCenterPage

  constructor(public navCtrl: NavController) {

  }

}
