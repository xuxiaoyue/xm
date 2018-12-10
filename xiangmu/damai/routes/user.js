const express=require("express");
const router=express.Router();
const pool=require("../pool");
router.post("/signin",(req,res)=>{
    var pore=req.body.pore;
    var upwd=req.body.upwd;
    var sql1="select * from dm_user where phone=? and upwd=?";
    var sql2="select * from dm_user where email=? and upwd=?";
 
    if(pore.indexOf("@")==-1){
         var sql=sql1;
        }else{
          var sql=sql2;  
        }
          pool.query(sql,[pore,upwd],(err,result)=>{
              if(err)throw err;
              var output={};
              if(result.length>0){
                output.user=result[0]; 
                 req.session["uid"]=output.user["uid"];
                  res.writeHead(200,{
                    "Content-Type":"application/json;charset=utf-8",
                    "Access-Control-Allow-Origin":"*"
                  })
                  output.ok=1;
                  res.write(JSON.stringify(output));
                  
              }else{
                output.ok=0;
                res.write(JSON.stringify(output));
              }
              res.end();
          })
    
})
router.get("/isignin",(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
    });
    var output={}
    if(req.session["uid"]===undefined){   
        output.ok=0;
       res.write(JSON.stringify(output));  
       res.end(); 
     }else{
       var sql="select uname from dm_user where uid=?"
       pool.query(sql,[req.session["uid"]],(err,result)=>{
           if(err) throw err;
            output.uname=result[0].uname;
            output.ok=1;
            res.write(JSON.stringify(output));
            res.end();
       })
       
     } 
     
})
router.get("/signout",(req,res)=>{
  
  req.session["uid"]=undefined;
  res.end();
})
module.exports=router;