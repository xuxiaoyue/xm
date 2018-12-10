$(function(){
  $("div.login button").click(function(){
    var pore=$(".name").val();
    var upwd=$(".upwd").val();
    $.ajax({
        url:"http://127.0.0.1:3000/user/signin",
        type:"post",
        data:{pore,upwd},
        datatype:"json",
        success:function(output){
             if(output.ok==1){
                 location.href=location.search.split("back=")[1];
             }else{
                 alert("登录名称或登录密码有误");
             }
            
        }
    })
   }) 
   var $input=$("div.login button").prev();
   $input.keyup(function(e){
       if(e.keyCode==13){
        $("div.login button").click();
       }
  })
})