const express=require("express");
const router=express.Router();
const pool=require("../pool");
//获取通过搜索框中搜去相应的数据
router.get("/",(req,res)=>{
     var kword=req.query.kword;   
     var or=req.query.or;
     var arr=kword.split(" ");   
   
     for(var i=0;i<arr.length;i++){
        arr[i]=`title like '%${arr[i]}%'`
     }
     arr=arr.join(" and ");
     if(or!="0"){
        var  str=` order by ${or} `;
    }else{
        var str="  "
    }
     var where=`where ${arr}`;
     var sql="SELECT * FROM dm_product_search  "+where+str;
     console.log(sql)
     cx(sql,req,res);
})
router.get("/total",(req,res)=>{
   
    var sql="SELECT * FROM dm_product_search  "
    cx(sql,req,res);
})
router.get("/search",(req,res)=>{
    var ct=req.query.ct;
    var fm=req.query.fm;

    var tm=req.query.tm;
    var or=req.query.or;
    var arr=[ct,fm,tm],arr2=[],arr3=[];
       arr2[0]=`city='${ct}'`;
       arr2[1]=`family_id=${fm}`;
       arr2[2]=tm;
      
       for (var i=0,j=0;i<arr.length;i++){
           if(arr[i]!=="0")
           {
              console.log(arr[i])
              arr3.push(arr2[i]);
              j++;
           }           
       }  
       console.log(arr);
       console.log(arr2)
       console.log(arr3);
       if(or!="0"){
           var  str=` order by ${or} `;
       }else{
           var str="  "
       }
       console.log(str);
      if(j>1){
         arr3=arr3.join(" and ");
          var sql="SELECT * FROM dm_product_search where  "+arr3+str;
      }
      else if(j==1){
         arr3=arr3.join(" ");
          var sql="SELECT * FROM dm_product_search where  "+arr3+str;
      }else {
        var sql="SELECT * FROM dm_product_search   " +str;
      }
      console.log(sql);

      cx(sql,req,res)
   
})
router.get("/like",(req,res)=>{
    var pno=req.query.pno;
    var sql="SELECT * FROM dm_product_search order by dz DESC limit 3"; 
    cx(sql,req,res);
})
function cx(sql,req,res){
    var output={pageSize:9};
    output.pno=req.query.pno; 
   
   pool.query(sql,(err,result)=>{
      if(err)throw  err;
      output.count=result.length;
      output.pageCount=Math.ceil(output.count/output.pageSize);
      output.product=result.slice(output.pno*output.pageSize,output.pno*output.pageSize+output.pageSize); 
      res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
      });
      res.write(JSON.stringify(output));
      res.end();
    })   
}
module.exports=router;
