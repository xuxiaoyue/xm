import { Injectable } from '@angular/core'
import { HttpClient }from '@angular/common/http'
import { LoadingController }from 'ionic-angular'
@Injectable()
export class MyHttpService {
   constructor(private myHttp:HttpClient,private loadingCtrl:LoadingController){

   }
  
    sendRequest(url,func){
        //发请求
        //控制loading的显示和隐藏
        var myLoading=this.loadingCtrl.create({
            content:'正在加载数据...'
        })
        myLoading.present();
        this.myHttp.get(url,{withCredentials:true}).subscribe((res)=>{
           //关闭loading
           myLoading.dismiss()
           //调用成功的回调函数
            func(res)
        })
    }
}