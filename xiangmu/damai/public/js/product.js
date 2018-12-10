$(function(){
    //1.加载图片
    $(".search_list_loading").slideToggle ();  
    var $ul=$("ul.search_page");
    var data={pno:0,ct:"0",fm:"0",tm:"0",or:"0"};
    //2.搜索栏搜索产品
    var find={pno:0,or:"0",kword:"0"}
    if(location.search.indexOf("kword=")!=-1){
       
        var kword=decodeURI(location.search.split("=")[1]);
       
        find.kword=kword;
       $.ajax({
            url:"http://127.0.0.1:3000/product",
            type:"get",
            data:find,
            dataType:"json",
            success:function(output){
                page(output)
                cx(output);
                
       }
    })
}else{
    $.ajax({
        url:"http://127.0.0.1:3000/product/search",
        type:"get",
        data:data,
        dataType:"json",
        success:function(output){
            page(output)
            cx(output);
           
           
        }
    }) 
}
 

    //3.默认状态搜寻全部，网页点击  
  
        
         if(location.search.indexOf("fm")!=-1)
        { data.fm=parseInt(location.search.split("fm=")[1].slice(0,2));
         console.log(data.fm)
          if(data.fm!=0)  
            {  $(".search_city_line #first>a.first").removeClass("first");
                $(`#family ul>li:eq(${data.fm-1})`).siblings().children().removeClass("first"); 
                $(`#family ul>li:eq(${data.fm-1})>a`).addClass("first");
           }
        }
        
         $(".search-city a").click(function(){
          
            var $a=$(this);
            
            if($a.attr("data-spn"))
                 {   $(".search_city #first>a.first").removeClass("first");
                     $a.parent().siblings().children().removeClass("first"); 
                     $a.addClass("first");
                     
                  var   ct=$a.attr("data-spn"); 
                      ct=ct.split("=")[1];
                      
                      data.ct=ct;
                    
              }
                   
           if($a.attr("data-fm")){
                      
                   $(".search_city_line #first>a.first").removeClass("first");
                      $a.parent().siblings().children().removeClass("first"); 
                      $a.addClass("first");
                      
                   var   fm=$a.attr("data-fm"); 
                      
                       data.fm=fm;      
                  
           }      
           if($a.attr("data-tm")){
                
                  $a.parent().siblings().children().removeClass("first"); 
                  $a.addClass("first");
                  var tm=$a.attr("data-tm");
                  var now=new Date();
                  var year=now.getFullYear();
                  var month=now.getMonth()+1;
                  var day=now.getDate();
                  var dd=now.getDay();
                 
                  now=`${year}.${month}.${day}`;
                  if(tm==1){
                      data.tm=` p_time like '%${year}.${month}.${day}%'`;
                  }else if(tm==2){
                      
                      var tomorrow=` p_time like '%${year}.${month}.${day+1}%'`;
                      data.tm=tomorrow;
                  }else if(tm==3){
                      var tt=6-dd;
                      if(dd==0){
                         
                          data.tm=` p_time like '%${year}.${month}.${day}%'`;;
                      }else{
                          var tt=6-dd;
                          week=` p_time like '%${year}.${month}.${day+tt}' or p_time like '%${year}.${month}.${day+tt+1}'`
                          
                          data.tm=week;
                      }
                     
                  }else if(tm==4){
                           
                           now = new Date(now.replace(/\./g,"/"));
                          nextMonth =new Date( now.setMonth(now.getMonth() + 1));
                          nextMonth=nextMonth.toLocaleDateString();
                          nextMonth=nextMonth.replace(/\//g,".");
                          data.tm=` p_time >= '${year}.${month}.${day}' and  p_time <= '${nextMonth}' `  
                  }
                  
              }              
             $.ajax({
               url:"http://127.0.0.1:3000/product/search",
               type:"get",
               data:data,
               dataType:"json",
               success:function(output){
                  
                  page(output);
                  cx(output);
               }
            })
         
          })
        
     //4.方式查询     
     $(".search_way").on("click","a",function(){
            var $a=$(this);
            $a.parent().siblings().children().removeClass("way-first");
            $a.addClass("way-first");
            var num=$a.attr("data-st");
        if(num==0){ 
                or="pid desc";
        }else if(num==1){
            or="dz desc";
        }else if(num==2){
            or="p_time";
        }else if(num==3){
            or="zt='预定'";
        }
        data.or=or;
        find.or=or;
       if(find.kword!="0")
        {    $.ajax({
                url:"http://127.0.0.1:3000/product/",
                type:"get",
                data:find,
                dataType:"json",
                success:function(output){
                page(output);
                cx(output);
                
                }
            })
        }else{
            $.ajax({
                url:"http://127.0.0.1:3000/product/search",
                type:"get",
                data:data,
                dataType:"json",
                success:function(output){
                 page(output);
                    cx(output);
                    
                }
            })
        }    
        })     
  
      
    //5.查看跟多
    $("dl.search_city .city_all>li:gt(19)").hide();
     $("a.search-city-more").click(function(){
         $("dl.search_city .city_all>li:gt(19)").toggle();
     })
   

    function cx(output)        
        { var  {product}=output;
    
        $("ul.search_list").children().remove();
        var html=``;
        for(var item of product)
        {
            html+=`<li>
            <div class="search_img">
                <a href="${item.href}"><img src="${item.pic}" alt=""></a>
            </div>
            <div class="search_txt">
                <h3> <a href="">${item.title}</a> </h3>
                <p><span>${item.details}</span></p>
                <p class="search_txt_time">${item.p_time}</p>
                <p class="cl"> <span>${item.place}</span> </p>
                <p class="search_txt_prc"><em>${item.price}</em>${item.zt}</p>
            </div>
            </li>`;
        }
        $("ul.search_list").append(html);
       
    }
   
     
   //右边内容
   
   $.ajax({
       url:"http://127.0.0.1:3000/product/like",
       data:{pno:0},
       dataType:"json",
       success:function(output){
           var {product}=output;
            var html=``;
            for(var item of product){
                html+=` <li>
                <div class="search_img_con">
                    <a href=""><img src="${item.pic}" alt=""></a>
                </div>
                <div class="search_txt_con">
                    <h3><a href="">${item.title}</a> </h3>
                    <p><span>${item.place}</span></p>
                    <p class="search_txt_time_con">${item.p_time}</p>
         
                    <p class="search_txt_prc_con"><em>${item.price}元</em>起</p>
                </div>
            </li>`
            }
            $("ul.search_list_con").append(html)
       }
   })
   //分页
  
  function page(output){
     var {pageCount}=output; 
     
    var $pagef=$("li.search_page_pre")
        var html=``;
          $("ul.search_page>li:gt(0):not(:last)").remove();
         
        for(var i=1;i<=pageCount;i++){
            html+=`<li class="${i==data.pno+1?'active':''}"> <a href="#" >${i}</a></li>`
        
        }
      
        $pagef.after(html);
        if(data.pno==0){
            $ul.children().first().addClass("disabled");
        }else{
            $ul.children().first().removeClass("disabled");
        }
        if(data.pno==pageCount-1){
            $ul.children().last().addClass("disabled");
        }else{
            $ul.children().last().removeClass("disabled");
        }
           
    } 
    $ul.on("click","a",function(e){
        e.preventDefault();
        var $a=$(this);
        if(!$a.parent().is(".disabled,.active")){
              if($a.parent().is(":first-child")){
                  data.pno=data.pno-1
              }else if($a.parent().is(":last-child")){
               data.pno=data.pno+1
              }else{
                  data.pno=$a.html()-1;
              }
               
        }
        $.ajax({
            url:"http://127.0.0.1:3000/product/search",
            type:"get",
            data:data,
            dataType:"json",
            success:function(output){
             page(output);
             cx(output);
                
            }
        })
  })
   
  
})
