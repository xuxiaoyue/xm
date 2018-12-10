import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { MyHttpService } from '../../app/utility/service/myhttp.service'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  value1=''
  value2=''
  constructor(
    private toastCtrl:ToastController,
    private myService:MyHttpService,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
   var  url="http://localhost/xiangmu/app/ajia_code/ajia_code/data/user/login.php?uname="+this.value1+"&upwd="+this.value2;
      this.myService.sendRequest(url,(res)=>{
        console.log(res)
          if(res.code==200){
            this.navCtrl.pop()
          }else{
            this.toastCtrl.create({
              message:"登录失败",
              duration:1500,
            }).present()
          }
      })
  }
}
