const express=require("express");
const router=express.Router();
const pool=require("../pool");
router.get("/",(req,res)=>{
   var ct=req.query.city;
   console.log(ct)
    if(ct!=="全国"){
    var sql="SELECT * FROM dm_product_search where city=? and family_id=2  limit 7"
   }else{
       var sql="SELECT * FROM dm_product_search where  family_id=2  limit 7"
   }   
    pool.query(sql,[ct],(err,result)=>{
        if(err) throw err;
        res.send(result);
       
    })
})
module.exports=router;