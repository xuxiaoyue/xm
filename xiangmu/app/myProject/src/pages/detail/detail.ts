import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import { NotfoundPage }from '../notfound/notfound'
import { CartPage }from '../cart/cart'
import { LoginPage }from '../login/login'
/** 
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
 picList=[]
 title=""
 subtitle=""
 price=""
  res={}
  myId=0
  constructor(
    private toastCtrl:ToastController,
    private myService:MyHttpService,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
     this.myId= this.navParams.get("id")
     var url='http://localhost/xiangmu/app/ajia_code/ajia_code/data/product/details.php?lid='+this.myId;
     this.myService.sendRequest(url,(res:any)=>{
      this.picList=res.details.picList;
      this.title=res.details.title;
      this.subtitle=res.details.subtitle;
      this.price=res.details.prcie;
 })
 
  }
  jumpToNotFound(){
      this.navCtrl.push(NotfoundPage)
  }
  jumpToCart(){
    this.navCtrl.push(CartPage)
  }
  addToCart(){
    var url="http://localhost/xiangmu/app/ajia_code/ajia_code/data/cart/add.php?lid="+this.navParams.get("id")+"&buyCount=1"
     this.myService.sendRequest(url,(res)=>{
      console.log(res)
      var msg
      if(res.code==200){
        msg="添加成功"
      }else if(res.code==300){
        msg="添加失败"
        this.navCtrl.push(LoginPage)
      }else{
        msg="添加失败"
      }
      this.toastCtrl.create({
        message:msg,
        duration:1500
      }).present()
    })
  }
}
