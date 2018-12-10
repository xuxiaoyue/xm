const express=require("express");
const router=express.Router();
const pool=require("../pool");
router.get("/",(req,res)=>{
    var pid=req.query.pid;
    var sql1="SELECT * FROM `dm_product_search` where pid=?";
    var sql2="SELECT * FROM `dm_product_info` where pid=?";
    var output={product:{},info:[]}
   Promise.all([
       new Promise(function(open,err){
               if(err) console.log(err);
               pool.query(sql1,[pid],(err,result)=>{
                if(err) throw err;       
                output.product=result[0];
                 open();
            })}),
       new Promise(function(open,err){
                if(err) console.log(err);
                pool.query(sql2,[pid],(err,result)=>{
                 if(err) throw err;       
                 output.info=result;
                   open();
             })})
      ]).then(function(){
          res.writeHead(200,{
              "Content-Type":"application/json;charset=utf-8",
              "Access-Control-Allow-Origin":"*"
          });
          res.write(JSON.stringify(output));
          res.end();
      })  
    })
 

module.exports=router;