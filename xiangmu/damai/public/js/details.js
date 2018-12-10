$(function(){
    if(location.search.indexOf("pid")!=-1){
        var pid=location.search.split("=")[1];   
       $.ajax({
                url:"http://127.0.0.1:3000/details",
                type:"get",
                data:{pid},
                dataTpye:"json",
                success:function(output){
                  console.log(output);
                    var {info,product}=output;
                   var html=``;
                  for(var i=0;i<info.length;i++){
                     html+=`<li class="item  ${info[i].p_zs==0?'showT':''}  ${i==0?'pitch':'itm'}"><a href="javascript:void(0)" class="ctt  " >${info[i].p_time}</a></li>`;
                  }
                  $("div.tt-4 ul.ct").html(html);
                  var html=``;
                  for(var i=0;i<info.length;i++){
                    html+=`<li class="item  ${info[i].p_zs==0?'showT':''} ${i==0?'pitch':'itm'}"><a href="javascript:void(0)" class="ctt" ><span>${info[i].p_price}</span></a></li>`;
                 }
                
                 $("div.tt-5 ul.ct").html(html);
                 
                 $("div.tt-6 #tm").html(info[0].p_time);
                 $("div.tt-6 #pr").html(info[0].p_price);
                }
      })  
      $("div.tt-4 ul.ct").on("click","li",function(){
          var $li=$(this);
         if(!$li.is(".showT"))
            { $("div.tt-4 ul.ct>li:first").removeClass("pitch").addClass("itm");
              $li.siblings().removeClass("pitch");
              $li.addClass("pitch");
              var html=$li.children().html();
              $("div.tt-6 #tm").html(html);
            
            }
          

      })   
      $("div.tt-5 ul.ct").on("click","li",function(){
        var $li=$(this);
       if(!$li.is(".showT"))
          { $("div.tt-5 ul.ct>li:first").removeClass("pitch").addClass("itm");
            $li.siblings().removeClass("pitch");
            $li.addClass("pitch");
            var html=$li.children().children().html();
            
            $("div.tt-6 #pr").html(html);
          }
          
    })    
      $(".tt-6 span.m-nums>a").click(function(){
          var $btn=$(this);
          if($btn.is(".btn-low")){
              if($btn.next().val()>1){
                var val=$btn.next().val();
                val--;
                $btn.next().val(val)
              }
          }
          if($btn.is(".btn-add")){
            if($btn.prev().val()<5){
                var val=$btn.prev().val();
                val++;
                $btn.prev().val(val)
            }
        }
     
      })
      $(".tt-6 li>a.bta ").click(function(){
          var $a=$(this);
          $a.parent().remove();
      })
      $(".tt-6>div.op ").click(function(){
         var pt=  $("div.tt-6 #tm").html();
         var pp= $("div.tt-6 #pr").html();
         var num=$("div.tt-6 .m-nums input").val();
        console.log(num)
        $.ajax({
            url:"http://127.0.0.1:3000/user/isignin",
            type:"get",
            datatype:"json",
            data:{pt,pp,num},
            success:function(output){
               var ok=output.ok;
               console.log(output);
               if(ok==1){
                  location.href="order.html?pt="+pt+"&pp="+pp+"&num="+num;
               }else{
                  location.href="login.html?back="+location.href
               }
            }
          })
      })
      $(".tt-7 h3").hover(function(){
          var $h=$(this);
          $h.next().toggle();
      })
      $("h2.tt-1>a").click(function(){
            if(!$(this).children().first().is(".open"))   
            { $(this).children().first().addClass("open");
            var num=parseInt($("span.num").html())+1;
            $(this).find(".num").html(num);                  
                 $("span.add").show().animate({
                            top:-20,
                            left:20,
                            opacity:0
                },2000);     
            }else{
                $(this).children().first().removeClass("open");
            }
         
      })
      $("ul.tab").on("click","li",function(){
          var $li=$(this);
          $li.children().first().removeClass("first");
          $li.siblings().children().removeClass("first");  
          $li.children().addClass("first");
          var a=$li.children().attr("data-toggle");
          if(a==2){
            
           $("div.m-buy").siblings(".bd").hide();
              $("div.m-buy").show()
          }else if(a==3){
            $("div.m-pay").siblings(".bd").hide();
            $("div.m-pay").show()
          }else{
            $("div.m-live").siblings(".bd").hide();
            $("div.m-live").show()
          }
      })
        }
    })
