$(function(){
    
      
    //1.请求header.html片段
    $.ajax({
        url:"http://127.0.0.1:3000/header.html",
        type:"get",
        success:function(res){
            $("#header").replaceWith(res);
              //0.热点差
                $("#close").click(function(){
                    $("div.adverse").hide();
                })
            //1.实现搜索相关联的产品
                var $search=$(".search-header>div");
                var $input=$search.prev();
                $search.click(function(){
                    var kword=$input.val().trim();
                    if(kword!=="")
                    location.href=`product-info.html?kword=${kword}`;
                });
                $input.keyup(function(e){
                if(e.keyCode==13)
                $search.click();
                })
                if(location.search.indexOf("kword")!=-1)
                
                {var kword=decodeURI(location.search.split("=")[1]) ;
                $input.val(kword)}
           //2.定位城市
           
                $(".location-header").hover(function(){
                    $(".city-header-wrap").show();
                    $(".namet").on("click",".name-city",function(){
                        var $spn=$(this);
                      var  city=$spn.attr("data-spn");
                            city=city.split("=")[1];
                        $("div.location-header>span:first").html(city);
                        $("div.now-city>span:last ").html(city);
                        if(location.search.indexOf("city=")==-1) {
                            location.href=location.href+"?city="+city;
                        } else{
                            location.href=location.search.split("?")[0]+"?city="+city;
                        }
                    })
                    
                    },function(){
                    $(".city-header-wrap").hide();
                })


          //3.登录 
             $("ul.header-ul>li:first").click(function(){
                 location.href="login.html?back="+location.href
             })
          //4.登录情况
          $.ajax({
              url:"http://127.0.0.1:3000/user/isignin",
              type:"get",
              datatype:"json",
              success:function(output){
                 var ok=output.ok;
                 console.log(output);
                 if(ok==1){
                     $("ul.header-ul>li:first span").html(output.uname)
                 }else{
                    $("ul.header-ul>li:first span").html("登录")
                 }
              }
          })
          //5.显示用户信息列表
          $("ul.header-ul>li:first").hover(function(){
              $("div.user-now").toggle();
          })
          //6.退出登录
      $("div.user-now>div.singinOut").click(function(){ 
          $.ajax({
            url:"http://127.0.0.1:3000/user/signout",
            type:"get",
            datatype:"json",
            success:function(){
               history.go(0);
            }
          })            
        }) 
        //7.点击分类
        console.log(location.href.indexOf("product-info.html"));
         if(location.href.indexOf("product-info.html")!=-1){
             $("#classify").addClass("color").prev().removeClass("color");

         }
     }  
    })
    
    //2.动态创建link引入header.css
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
})