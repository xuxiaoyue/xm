import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService} from '../../app/utility/service/myhttp.service'
import{ PayPage }from '../pay/pay'
import { IndexPage} from '../index/index'
/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  list=[]
  constructor(
    private modalCtrl:ModalController,
    private myService: MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    var url="http://localhost/xiangmu/app/ajia_code/ajia_code/data/cart/list.php"
    this.myService.sendRequest(url,(res)=>{
       console.log(res)
       if(res.code==200){
         this.list=res.data
       }
    })
  }
  showModal(){
      var myModal=this.modalCtrl.create(PayPage)
      myModal.present()
      myModal.onDidDismiss((res)=>{
        if(res){
         this.navCtrl.parent.select(0)
        }
      })
  }
}
