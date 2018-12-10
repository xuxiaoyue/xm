
$(function(){
    if(location.search.indexOf("city=")==-1){
        var city="全国";
    }else{
        var city=decodeURI(location.search.split("city=")[1]);
        console.log(city);
    }
    
    $.ajax({
        url:"http://127.0.0.1:3000/index/",
        type:"get",
        dataType:"json",
        data:{city},
        success:function(res){
            var {title,price,pic,href}=res[0];
            var price=price.split("-")[0];
            console.log(title,price,pic,href);
            var html=`` ;
             html=`
             <a href="${href}">
                <img src="${pic}" alt="">
                <div class="box-left-info">
                     <a class="title">${title} </a>
                     <a class="money">￥${price} <span style="font-size:14px">起</span></a>
                </div>
            </a>`
            var title=document.querySelector(".content-1>div");
            title.innerHTML="音乐会";
           $("div.box-left").html(html);
           var html=``;
           for(var i=1;i<4;i++){
           
            var {title,price,pic,place,p_time}=res[i];
        
            html+=`<a class="box-right-list"href=${href}>
            <img src="${pic}" alt="">
            <div class="box-right-item">
                 <div class="title">${title} </div>
                 <div class="venue">${place}</div>
                 <div class="showTime">${p_time}</div>
                 <div class="price">¥${price} <span style="font-size:12px">起</span></div>
            </div>
       </a>`
           
        }
        
        $("#first>div.box>div.box-right>div.box-right-first").html(html);
        
        var html=``;
           for(var i=4;i<7;i++){
           
            var {title,price,pic,place,p_time}=res[i];
        
            html+=`<a class="box-right-list"href=${href}>
            <img src="${pic}" alt="">
            <div class="box-right-item">
                 <div class="title">${title} </div>
                 <div class="venue">${place}</div>
                 <div class="showTime">${p_time}</div>
                 <div class="price">¥${price} <span style="font-size:12px">起</span></div>
            </div>
       </a>`
           
        }
        
        $("#first>div.box>div.box-right>div.box-right-last").html(html);
        }

    })  
    //1.查看更多
     $("#first>div.content-1>a").click(function(){
        var $a=$(this);
        var $div=$a.prev();
       var fm= $div.attr("data-fm")
       $a.attr({href:"product-info.html?fm="+fm})  
     }) 
     //2.类型导航
     $(".category").on("click","a",function(){
         var $a=$(this);
         var fm=$a.attr("data-fm");
         $a.attr({href:"product-info.html?fm="+fm})
     })
})
