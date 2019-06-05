/* 
    1. 会员注册
	2. 会员登录
	3. 修改密码
	4. 修改会员信息
 */

$(document).ready(function(){
	//邮箱验证
	var emailREG ="/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/";
	//电话验证(手机+座机)
	var phoneREG="/^[[0-9]{3}-|\[0-9]{4}-]?(\[0-9]{8}|[0-9]{7})?$|^[1][0-9]{10}$/"; 
	//手机验证
	var mobileREG="/^[1][0-9]{10}$/";
	//座机验证
	var telREG="/^[[0-9]{3}-|\[0-9]{4}-]?(\[0-9]{8}|[0-9]{7})?$/";
	 
  
   
//////////////////////////////////////////////////////////////////登录:loginfrm///////////////////////////////////////////////////////////////////////////
	
  $(".loginfrm .clickme").click(function(){
       var uname=$.trim($(".loginfrm [name='uname']").val()); 
       var pwd= $(".loginfrm [name='pwd']").val();   
	   if(uname==""||pwd==""){
		   alert("请输入账号密码！");
		   return false;
	   }  
	   $.ajax({
        cache:"FALSE",
         type:"POST",
          url:"ajax/login_ajax.php",
     dataType:"json",
        data:{"uname":uname,"pwd":pwd},
	 timeout:15000,
     success:function(json){
             if(json.success==0){
				 alert("登录成功");  
				 //设置登录成功后的跳转页面
				 window.location.href="h.php"; 
				 return true;
             }else{
				 alert("登录失败！失败可能原因： 账号不准确!");
				 return false;
			 }
        }//success
      });//ajax
  });
  ////////////////////////////////////////////////////////////////会员注册:rsgfrm//////////////////////////////////////////////////////////////////////

//两次密码输入检查是否一致
    $(".rsgfrm [name='pwd2']").blur(function(){
            var pwd2=$(this).val();
            var pwd1=$(".rsgfrm  [name='pwd']").val();
			  
            if (pwd1!=pwd2) {  
				 alert("两次密码输入不一样，请重试！");
			} 
   });
	  
//及时检查用户名是否可用 
     $(".rsgfrm [name='uname']").blur(function(){
		 
       var uname=$.trim($(this).val());
	   
		 $.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/rsg_ajax.php",
     dataType:"json",
        data:{
			     "uname":uname,
				 "unamecheck":0 
				},
	 timeout:15000,
     success:function(json){
             if(json.success==1){
				 $(".rsgfrm [name='uname']").css("color","red");
				 alert("该用户名已被其它用户注册，请更换！");  
				 return true;
             } 
        }//success
      });//ajax 
	 });
	 
   $(".rsgfrm [name='uname']").click(function(){
	    $(".rsgfrm [name='uname']").css("color","#111111");
   });
//注册   
   $(".rsgfrm .clickme").click(function(){
       var uname=$.trim($(".rsgfrm [name='uname']").val()); 
	   alert(uname);
       var name=$.trim($(".rsgfrm [name='name']").val()); 
       var addr=$.trim($(".rsgfrm [name='addr']").val()); 
       var email=$.trim($(".rsgfrm [name='email']").val()); 
       var tel=$.trim($(".rsgfrm [name='tel']").val()); 
       var pwd= $(".rsgfrm [name='pwd']").val(); 
       var pwd2= $(".rsgfrm [name='pwd2']").val();
//限制条件可自行增删   
	   mytishi="";
	   if(name==""){
		   mytishi+="称呼不能为空、";
	   }
	   if(uname==""){
		   mytishi+="会员名不能为空、";
	   }
	   if(tel==""){
		   mytishi+="座机不能为空、";
	   }
	   if(addr==""){
		   mytishi+="收货地址不能为空、";
	   }
	   if(pwd.length<6||pwd.length>18) {
		   mytishi+="密码必须为6到18个字符、";
	   }
	   if(pwd!=pwd2){
		   mytishi+="两次密码输入不一致、";
	   }
	   if(mytishi!=""){
		   mytishi=mytishi.substring(0,mytishi.length-1);
		   alert(mytishi);
		   return false;
	   }
       
	  if(confirm("确定提交？")){
			$.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/rsg_ajax.php",
     dataType:"json",
        data:{
			     "uname":uname,
				 "pwd":pwd,
				 "addr":addr,
				 "name":name,
				 "email":email,
				 "tel":tel
				},
	 timeout:15000,
     success:function(json){
             if(json.success==0){
				 alert("注册成功,请登录！"); 
			     window.location.href="login.php";
				 return true;
             }else{
				 if(json.success==1)
				 alert("该用户名已被其它用户注册，请更换！");
			    else
				 alert("系统繁忙，请稍后重试！");
				 return false;
			 }
        }//success
      });//ajax 
	   }//confirm
		 
  });
  
   
  
	  
 //////////////////////////////////////////////////////////////////////修改会员信息////////////////////////////////////////////////////////////////
$(".hfrm .clickme").click(function(){
		  
       var name= $(".hfrm [name='name']").val();
       var tel= $(".hfrm [name='tel']").val();  
       var addr= $(".hfrm [name='addr']").val();  
       var email= $(".hfrm [name='email']").val();  
       var uid= $(".hfrm [name='uid']").val();  
	  
			$.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/h_ajax.php",
     dataType:"json",
        data:{"uid":uid,"name":name,"tel":tel,"addr":addr,"email":email},
	 timeout:15000,
     success:function(json){
             if(json.success==0){ 
					  alert("修改成功！");
					  window.location.href="h.php?home"; 
				      return true;
             }else{ 
					  alert("修改失败，请重试！");
				       
			 } 
        }//success
      });//ajax 
			 
			  
});
	 
	  
 //////////////////////////////////////////////////////////////////////////////修改密码///////////////////////////////////////////////////////////////////
//及时检查原密码是否正确
$(".pwd2frm [name='pwd']").blur(function(){
       var pwd=$.trim($(this).val());
       var uid= $(".pwd2frm [name='uid']").val();
		 $.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/pwd2_ajax.php",
     dataType:"json",
        data:{
			     "pwd":pwd,
			     "uid":uid,
				 "pwd2check":0
			 },
	 timeout:15000,
     success:function(json){
             if(json.success==1){
				 $(".pwd2frm [name='pwd']").html();
				 alert("原密码输入有误");  
				 return true;
             } 
        }//success
      });//ajax 
});
	 
	 
$(".pwd2frm .clickme").click(function(){
		  
       var pwd3= $(".pwd2frm [name='pwd3']").val();
       var pwd2= $(".pwd2frm [name='pwd2']").val();  
       var pwd= $(".pwd2frm [name='pwd']").val();  
       var uid= $(".pwd2frm [name='uid']").val();  
			if(pwd.length<=0){  
				 alert("请先输入登录密码！");
				 return false;
			} 
            if (pwd3!=pwd2) {  
				 alert("两次密码输入不一样，请重试！");
				 return false;
			} 
			if(pwd2.length<6 || pwd2.length>18){  
				 alert("新密码位数必须为6至18位！");
				 return false;
			} 
				
			$.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/pwd2_ajax.php",
     dataType:"json",
        data:{"uid":uid,"pwd":pwd,"pwd2":pwd2},
	 timeout:15000,
     success:function(json){
             if(json.success==0){
				 if(confirm("修改密码成功，重新登录？")){
					  window.location.href="h.php?loginoff&login";
				 }  
				 return true;
             }else{
				 if(json.success==1){
					  alert("登录密码输入有误！");
				       return false;
				 }else{ 
					  alert("修改密码失败！");
				       return false;
				 }
			 } 
        }//success
      });//ajax
});
	 
});//ready