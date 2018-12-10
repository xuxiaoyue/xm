import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import { HttpClient } from '@angular/common/http'
import { LoginPage  }from '../login/login'
import { OrderConfirmPage }from '../order-confirm/order-confirm'
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  myList=[]
  total=0
  isAllSelected=false;
  constructor(
    private myService:MyHttpService,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    var url="http://localhost/xiangmu/app/ajia_code/ajia_code/data/cart/list.php"
    console.log(1)
    this.myService.sendRequest(url,(res)=>{
     
      if(res.code==200){
       this.myList=res.data
       console.log('text',this.myList)
       for(var i=0;i<this.myList.length;i++){
          this.myList[i].isSelected=false
       }
       console.log(this.myList)
      }else if(res.code==300){
        this.navCtrl.push(LoginPage)
      }
    })
    
  }
  delete(index) {
       this.myList.splice(index,1)
  }
  operateAll(){
    for(var i=0;i<this.myList.length;i++){
      this.myList[i].isSelected=this.isAllSelected
    }
  }
  operateOne(){
    var result=true
    for(var i=0;i<this.myList.length;i++){
      result=result && this.myList[i].isSelected
    }
    this.isAllSelected=result
  }
  calcAll(){
    var totalPrice=0
    for(var i=0;i<this.myList.length;i++ ){
      var product=this.myList[i]
      if(product.isSelected){
        totalPrice+=product.price*product.count

      }
    }
    this.total=totalPrice
    return totalPrice
  }
  jump(){
    if(this.total==0)return
    this.navCtrl.push( OrderConfirmPage )
  }
  modifyCount(isAdd,index){
       if(isAdd){
         this.myList[index].count++
       }else{
       if(this.myList[index].count==1) {return} 
        this.myList[index].count--
       }
  }
}
