import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule } from '@angular/common/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { DetailPage } from '../pages/detail/detail';
import { IndexPage } from '../pages/index/index';
import { LoginPage } from '../pages/login/login';
import { NotfoundPage  } from '../pages/notfound/notfound';
import { OrderConfirmPage} from '../pages/order-confirm/order-confirm';
import{ PayPage } from '../pages/pay/pay';
import {UserCenterPage} from '../pages/user-center/user-center'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyHttpService }from './utility/service/myhttp.service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    DetailPage,
    IndexPage,
    LoginPage,
    NotfoundPage,
    OrderConfirmPage,
    PayPage,
    UserCenterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    DetailPage,
    IndexPage,
    LoginPage,
    NotfoundPage,
    OrderConfirmPage,
    PayPage,
    UserCenterPage
  ],
  providers: [
    MyHttpService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
