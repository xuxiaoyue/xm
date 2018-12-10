const express=require("express");
const pool=require("./pool");
var app=express();
app.use(express.static(__dirname+"/public"));
app.listen(3003);
const cors=require("cors")
app.use(cors({
    origin:["http://127.0.0.1:3001","http://localhost:3001"],
    credentials:true
}))
app.get('/imagelist',(req,res)=>{
    var obj=[
        {id:1,img_url:"http://127.0.0.1:3003/img/index/IMG_3318.png"},
        {id:2,img_url:"http://127.0.0.1:3003/img/index/IMG_3319.PNG"},
        {id:3,img_url:"http://127.0.0.1:3003/img/index/dingdan.png",title:"订单"},
        {id:4,img_url:"http://127.0.0.1:3003/img/index/wode.png",title:"我的"},
        {id:5,img_url:"http://127.0.0.1:3003/img/index/lipinqia.png",title:"礼品卡"},
        {id:6,img_url:"http://127.0.0.1:3003/img/index/xianshi.png",title:"限时平团"},
        {id:7,img_url:"http://127.0.0.1:3003/img/index/yingyuanicon.png",title:"CC影院"},
        {id:8,img_url:"http://127.0.0.1:3003/img/index/qianbao.png",title:"CC钱包"},
       ];
    res.send(obj);
})
app.get('/imagelists',(req,res)=>{
    var obj=[

        {id:1,img_url:"http://127.0.0.1:3003/img/product/1.jpg",fm:1,price:11,name:'青稞茶拿铁/中杯'},
        {id:2,img_url:"http://127.0.0.1:3003/img/product/1.jpg",fm:1,price:12,name:'青稞茶拿铁/大杯'},
        {id:3,img_url:"http://127.0.0.1:3003/img/product/2.jpg",fm:1,price:12,name:'鲜芋青稞茶拿铁/中杯'},
        {id:4,img_url:"http://127.0.0.1:3003/img/product/2.jpg",fm:1,price:20,name:'美式拿铁/中杯'},
        {id:5,img_url:"http://127.0.0.1:3003/img/product/f1.jpg",fm:1,price:15,name:'香草拿铁/中杯'},
        {id:6,img_url:"http://127.0.0.1:3003/img/product/f2.jpg",fm:1,price:20,name:'摩卡/大杯'},
        {id:7,img_url:"http://127.0.0.1:3003/img/product/n1.jpg",fm:2,price:11,name:'青稞牛奶/中杯'},
        {id:8,img_url:"http://127.0.0.1:3003/img/product/n2.jpg",fm:2,price:12,name:'青稞茶/大杯'},
        {id:9,img_url:"http://127.0.0.1:3003/img/product/n2.jpg",fm:2,price:12,name:'鲜芋牛奶/中杯'},
        {id:10,img_url:"http://127.0.0.1:3003/img/product/n1.jpg",fm:2,price:20,name:'鲜芋布丁/中杯'},
        {id:11,img_url:"http://127.0.0.1:3003/img/product/n1.jpg",fm:2,price:15,name:'香草牛奶/中杯'},
        {id:12,img_url:"http://127.0.0.1:3003/img/product/n1.jpg",fm:2,price:20,name:'香草红豆牛奶/大杯'},
        {id:13,img_url:"http://127.0.0.1:3003/img/product/xg1.jpg",fm:3,price:11,name:'金桔柠檬/中杯'},
        {id:14,img_url:"http://127.0.0.1:3003/img/product/xg2.jpg",fm:3,price:12,name:'芒果绿茶/大杯'},
        {id:15,img_url:"http://127.0.0.1:3003/img/product/xg3.jpg",fm:3,price:12,name:'柠檬茶/中杯'},
        {id:16,img_url:"http://127.0.0.1:3003/img/product/xg1.jpg",fm:3,price:20,name:'雪梨茶/中杯'},
        {id:17,img_url:"http://127.0.0.1:3003/img/product/xg2.jpg",fm:3,price:15,name:'红茶/中杯'},
        {id:18,img_url:"http://127.0.0.1:3003/img/product/xg3.jpg",fm:3,price:20,name:'西瓜汁/大杯'},
        {id:19,img_url:"http://127.0.0.1:3003/img/product/IMG_3320.png"},
       ];
    res.send(obj);
})
//分页显示:新闻分页
app.get("/newslist",(req,res)=>{
    //1:参数  当前页码  页大小(一页显示几行数据)
    var pno = req.query.pno;            //2
    var pageSize = req.query.pageSize;  //5
    //2:sql
    //2.1:查找总记录数->转换总页数  15->3
    var sql = "SELECT count(id) as c FROM xz_news";
  
  
    var obj = {};      //保存发送客户端数据
    var progress = 0;  //进度
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        var c = Math.ceil(result[0].c/pageSize);
        obj.pageCount = c;
        progress+=50;
        if(progress==100){
          res.send(obj);
        }
    });
    //2.2:查找当前页内容           中间5行
    //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,title,img_url,ctime,point";
  sql += " FROM xz_news";
  sql += " LIMIT ?,?";
var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
pageSize = parseInt(pageSize)
pool.query(sql,[offset,pageSize],(err,result)=>{
   if(err)throw err;
   //console.log(result);
   obj.data = result;
   progress+=50;
   if(progress==100){
     res.send(obj);
   }
})
})
  
app.get("/test01",(req,res)=>{
    var id=req.query.id;
    var age=req.query.age;
    res.send(id+":"+age)
})  
app.get("/news",(req,res)=>{
   
    var obj=[
        {id:1,ctime:"2017-11-12",img_url:"http://127.0.0.1:3003/img/banner1.png",title:"娱乐",desc:"今天各大媒体都报道了赵丽颖和冯绍峰结婚的时间"},
        {id:2,ctime:"2017-12-12",img_url:"http://127.0.0.1:3003/img/banner2.png",title:"体育",desc:"今天各大媒体都报道了赵丽颖和冯绍峰结婚的时间"},
        {id:3,ctime:"2017-1-12",img_url:"http://127.0.0.1:3003/img/banner3.png",title:"教育",desc:"今天各大媒体都报道了赵丽颖和冯绍峰结婚的时间"}
    ]
    res.send(obj)
})  
const qs=require("querystring")
app.post("/postProduct",(req,res)=>{
   req.on("data",(buff)=>{
       
       var obj=qs.parse(buff.toString());
       console.log(obj)
       var pno=obj.pno;
       var price=obj.price;
       res.send({code:1,msg:":"+pno+":"+"price"})

   })
})
  