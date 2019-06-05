$(document).ready(function(){
	var $hintArr=new Array("ok :)","需要","至少6个字符","格式不准确","字符个数不准确");
	var telreg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/;
	var reg =/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	//reg.test($email);
      
		
     $(window).load(function(){ 
        $(".tfrm [name='w']").focus();  
     });  
////////////////////////////////////////////////////////////////////////站点搜索///////////////////////////////////////////////////////////////
     $(".tfrm .clickme").click(function(){ 
          $w=$.trim($("[name='w']").val()); 
		  
		  if($w!=""){
			  $(".tfrm").submit();
		  }
     });
////////////////////////////////////////////////////////////////////////select联动///////////////////////////////////////////////////////////////
    $("#select1").change(function(){
	       psortid=$(this).val(); 
		   $.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/select_ajax.php",
     dataType:"json",
        data:{
			"psortid":psortid
		},
	 timeout:15000, 
     success:function(json){
             if(json.success==0){
				 $("#select2").html(json.msg);
				 return true;
             } 
        }//success
      });//ajax
    })
	 
	  
///////////////////////////////////////////////////////////////////////在线留言///////////////////////////////////////////////////////////////////
  //控制内容长度 
      $(".ofrm [name='cnt']").keyup(function(){ //发送开关  
            var cnt=$(this).val();
            if (cnt.length>6000) {  
				var myval=cnt.substring(0,6000)
				$(this).val(myval);
			} 
      });

//提交时 
  $(".ofrm .clickme").click(function(){//发送开关 
       var  cnt=$.trim($(".ofrm [name='cnt']").val());
       var  name=$.trim($(".ofrm [name='name']").val());
       var  tel=$.trim($(".ofrm [name='tel']").val());
       var  sort=$.trim($(".ofrm [name='sort']").val());
	   tishi="";
	   if(name.length>10) name=name.substring(0,10);
	   if(tel.length>15) tel=tel.substring(0,15);
	   if(cnt.length>6000) cnt=cnt.substring(0,6000);
       if(name=="") tishi+="姓名、"	   
       if(tel=="") tishi+="联系电话、"	   
       if(cnt=="") tishi+="需求说明、"	
       if(tishi!=""){
		   tishi=tishi.substring(0,tishi.length-1)+"不能为空！";
		   alert(tishi);
		   return false;
	   }	   
	  if(confirm("确认提交？")){ 
	  $.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/o_ajax.php",
     dataType:"json",
        data:{
			"cnt":cnt,
			"sort":sort,
			"name":name,
			"tel":tel,
			"tb":"o_tb"
		},
	 timeout:15000, 
     success:function(json){
             if(json.success==0){
				 alert("提交成功！"); 
				 location.reload();
				 return true;
             }else{
				 alert(json.msg);
				 return false;
			 }
        }//success
      });//ajax  
	 
	  }//confirm
     });
	 
///////////////////////////////////////////////////////////////////////综合查询/////////////////////////////////////////////////////////////////////

$(".line1 a").click(function(){
	     //处理当前行
		 sort=$(this).html();
		 $(".line1 li").removeClass("checked");
		 $(this).parent("li").addClass("checked");
		 //其它行
		 if(sort!='***'){
			 $(".wsort").css("display","block");
			 $(".dsort").css("display","none");
			 wsort=$(".wsort").children("li.checked").find("a").html();
			 dsort="";
		 }else{
			 $(".wsort").css("display","none");
			 $(".dsort").css("display","block");
			 dsort=$(".dsort").children("li.checked").find("a").html();
			 wsort="";
		 } 
		 //独立行
		 ranking=$(".ranking").children("li.checked").find("a").html();
		 
		 //操作
		  $.ajax({
        cache:"FALSE",
        type:"POST",
         url:"ajax/m_ajax.php",
     dataType:"json",
        data:{
			"sort":sort,
			"wsort":wsort,
			"dsort":dsort,
			"ranking":ranking
		},
	 timeout:15000, 
     success:function(json){
             if(json.success==0){
				 $("#show").html(json.msg);
				 return true;
             } 
        }//success
      });//ajax 

	  
});//line1
	 
	 
	   

}); 