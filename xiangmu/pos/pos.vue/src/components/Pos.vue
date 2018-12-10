<template>
  <div class="pos">
     <el-row >
        <el-col :span='7' class="pos-order" id="order-list">
           <el-tabs>
               <el-tab-pane label="点餐">
                 <el-table :data="tableData" border style="width:100% ">
                    <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                     <el-table-column prop="count" label="数量" width="50"></el-table-column>
                      <el-table-column prop="price" label="金额" width="70"></el-table-column>
                       <el-table-column  label="操作" width="100" fixed="right">
                         <template  slot-scope="scope" > 
                          <el-button  type="text" size="small" @click=" deleteGood(scope.row)" >删除</el-button>  
                          <el-button  type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>  
                        </template>  </el-table-column>
                        
                 </el-table>
                 <div class="total">
                   <span>数量：{{totalCount}}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span>金额：{{ totalMoney }}元</span>
                 </div>
                    <div class="div-btn">
                      <el-button  type="warning"  >挂单</el-button> 
                      <el-button  type="danger"  @click="deleteAllGoods() ">删除</el-button> 
                      <el-button  type="success" @click="checkout()" >结账</el-button> 
                    </div>   
               </el-tab-pane>
               <el-tab-pane label="挂单" color="red"></el-tab-pane>
               <el-tab-pane label="外卖"></el-tab-pane>
               <el-tab-pane label="结账" ></el-tab-pane>
           </el-tabs>
        </el-col>
        <el-col :span='14'>
           <div class="oftengoods">
               <div class="title"> 常用商品</div>
               <div class="oftengoods-list">
                  <ul>
                      <li v-for="oftenGood of oftenGoods" :key="oftenGood.id" @click="addOrderList(oftenGood)">
                         <span>{{oftenGood.goodsName}}</span>  
                         <span class="price">￥{{oftenGood.price}}</span> 
                      </li>   
                  </ul>   
               </div> 
           </div>
           <div class='goods-type'>
              <el-tabs>
                 <el-tab-pane label="主餐">
                    <div>
                      <ul  class="cookList">
                        <li  v-for="item of typeGoods0" :key="item.id"  @click="addOrderList(item)"> 
                          
                          <span class="foodImg"><img :src="item.img" style="height:60px"> </span>
                          <span class="foodtitle">{{item.goodsName}}</span> 
                          <span class="footprice">￥{{item.price}}</span>
                          </li>                   
                      </ul>
                    </div>
                 </el-tab-pane>
                 <el-tab-pane label="小食">
                   <div>
                      <ul  class="cookList">
                        <li  v-for="item of typeGoods1" :key="item.id"  @click="addOrderList(item)"> 
                          
                          <span class="foodImg"><img :src="item.img" style="height:60px"> </span>
                          <span class="foodtitle">{{item.goodsName}}</span> 
                          <span class="footprice">￥{{item.price}}</span>
                          </li>                   
                      </ul>
                    </div>
                 </el-tab-pane>
                 <el-tab-pane label="饮料">
                   <div>
                      <ul  class="cookList">
                        <li  v-for="item of typeGoods2" :key="item.id"  @click="addOrderList(item)"> 
                          
                          <span class="foodImg"><img :src="item.img" style="height:60px"> </span>
                          <span class="foodtitle">{{item.goodsName}}</span> 
                          <span class="footprice">￥{{item.price}}</span>
                          </li>                   
                      </ul>
                    </div>
                 </el-tab-pane>
                 
              </el-tabs>
           </div>
        </el-col>
     </el-row>

  </div>
</template>

<script>
export default {
  name: 'pos',
  data(){
    return{ 
     tableData:[],
      oftenGoods:[
        {goodsId:1,goodsName:'嫩牛肉河粉',price:39},
        {goodsId:2,goodsName:'春卷',price:15},
        {goodsId:3,goodsName:'虾仁黄瓜',price:15},
        {goodsId:4,goodsName:'牛肉丸河粉',price:39},
        {goodsId:5,goodsName:'越南冬瓜茶',price:15},
        {goodsId:6,goodsName:'牛肉米粉',price:15},
        
      ],
      typeGoods0:[{goodsId:1,goodsName:'嫩牛肉河粉',price:39,img:'img/3.jpg'},{
        goodsId:4,goodsName:'牛肉丸河粉',price:39,img:'img/4.jpg'}
      ],
        typeGoods1:[{goodsId:3,goodsName:'虾仁黄瓜',price:15,img:'img/1.jpg'}
      ],
       typeGoods2:[{goodsId:5,goodsName:'越南冬瓜茶',price:15,img:'img/2.jpg'}
      ],
      totalMoney:0,
      totalCount:0
    
    }
  },
 mounted:function(){
   var orderH=document.body.clientHeight;
   document.getElementById("order-list").style.height= orderH+"px";
 },

 methods:{

  getAllMoney(){
    this.totalMoney=0;
     this.totalCount=0;
     this.tableData.forEach(element=>{
       this.totalCount+=element.count;
       this.totalMoney=this.totalMoney+element.price*element.count;
     })
  },
  deleteAllGoods(){
    this.tableData=[];
     this.totalMoney=0;
     this.totalCount=0;
  },
    deleteGood(good){
     this.tableData=this.tableData.filter(o=>o.goodsId!=good.goodsId)
    this.getAllMoney();
  },
  checkout(){
    if(this.totalCount!=0){
      this.tableData=[];
      this.totalMoney=0;
      this.totalCount=0;
      this.$message({
        message:"结账成功，感谢你的光临",
        type:'success'
      })
    }else{
      this.$message.error('你还未选择商品')
    }
  },
   addOrderList(goods){
     //商品是否存在
   
     let isHave=false;
     for(let i=0;i<this.tableData.length;i++){
         if(this.tableData[i].goodsId==goods.goodsId){
           isHave=true
         }
     }
       console.log(goods)
     if(isHave){
       let arr=this.tableData.filter(o=>o.goodsId==goods.goodsId)
       arr[0].count++
     }else{
       let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
       
       this.tableData.push(newGoods)
      
     }
       this.getAllMoney()
   
   }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.pos-order{
  background-color: #ebedf1;
  border-right: 1px solid #cccc;

}
.div-btn{
  padding-top:10px;
}
.title{
height: 20px;
border-bottom: 1px solid #d3dce6;
background-color: #f9fafc;
padding:10px;
text-align: left;
} 
.oftengoods-list ul li{
   list-style: none;
  float: left;
  border:1px solid #d3dce6;
  padding:10px;
  margin: 10px;
  background-color: #fff;
}
.price{
  color:#58b7ff;
}
.goods-type{
  clear:both
}
.cookList li{
  list-style: none;
  width: 30%;
  border:1px solid #e5e9f2;
  height:  auto;
  overflow: hidden;
  background-color: rgba(247, 242, 242, 0.178);
  padding:2px;
  float: left;
  margin: 2px;

}
.cookList li span{
  display: block;
  float: left;
}
.footImg{
  width: 40%;

}
.total{
  background-color: #fff;
  padding:10px;
  border-bottom:1px solid #111;
}
.foodtitle{
  font-weight: 400;
  font-size: 16px;
  margin-left: 10px;
  margin-top:20px; 
}
.footprice{
  font-weight: 400;
  font-size: 16px;
  margin-left: 10px;
  margin-top:20px; 
  color:#58b7ff
}
</style>
