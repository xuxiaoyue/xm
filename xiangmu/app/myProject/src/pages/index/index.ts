import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { Slides } from 'ionic-angular';
import { DetailPage} from '../detail/detail'
/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',

})
export class IndexPage {
  res={}
  detail=DetailPage;
  @ViewChild(Slides) slides: Slides;
  constructor(
    private myHttp:HttpClient ,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  
    var url="http://localhost/xiangmu/app/ajia_code/ajia_code/data/product/index.php"
    this.myHttp.get(url).subscribe(res=>{
       this.res=res
      console.log(this.res)
    })
  
  }
  
}
