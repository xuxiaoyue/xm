import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import { HomePage } from '../home/home';
/**
 * Generated class for the NotfoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notfound',
  templateUrl: 'notfound.html',
})
export class NotfoundPage {
  count=5
  timer=null
  constructor(
    private myHttp:HttpClient,
    private myService:MyHttpService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotfoundPage');
   this.timer= setInterval(()=>{
      this.count--
      if(this.count==0)
        if( this.navCtrl.canGoBack()){
          this.navCtrl.pop()
        }else{
          this.navCtrl.push(HomePage)
        }
      
    },1000)
  
  }
  ionViewWillLeave(){
    console.log('准备离开')
      clearInterval(this.timer)
  }
   
}
