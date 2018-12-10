import { Component } from '@angular/core';
import { LoadingController,ViewController,IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(
    private loadingCtr:LoadingController,
    private ViewCtr:ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
  pay(){
     this.loadingCtr.create({
        content:"正在支付...",
         duration:3000
      }).present()
      setTimeout(()=>{this.ViewCtr.dismiss(true)},3000)
  }
  close(){
    this.ViewCtr.dismiss(false)
  }
}
