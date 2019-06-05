/**
 * Created by k on 2017/6/23.
 */
/*pc导航*/
$(function(){
    $('.nav>ul>li').mouseenter(function(){
        var index = $(this).index();
        /*var L=$("#slide-down>ul>li").length;*/
        if(index==1 || index==5) {
            $("#slide-down>ul>li").eq(index).css({left: $(this).offset().left, position: "absolute"});
            $('#slide-down').show();
            $('#slide-down>ul>li').eq(index).stop(true, false).css("visibility", "visible").siblings().stop(true, false).css("visibility", "hidden");
        }else{
            $('#slide-down').hide();
        }
    });
    $('header').mouseleave(function(){
        $('#slide-down').stop(true,false).hide().find('#slide-show>ul>li').stop(true,false).css("visibility","hidden");
    });
});
/*手机导航*/
$(function() {
    $('.dropdown').hover(function () {
        $(this).children('.dropdown-menu').slideToggle(300);
    });
    $('#grade_01>li').click(function (e) {
        if ($(this).children('ul').length != 0) {
            e.preventDefault();
        }
        ;
        $(this).addClass('active');
        $(this).children('ul').slideToggle();
        $(this).siblings().removeClass('active').children('ul').slideUp();
    });
    $('#grade_01>li>ul>li').on('click', function (e) {
        e.stopPropagation();
    });
    var n = true;
    $('#btn').click(function () {
        if (n) {
            n = false;
            /*$(this).css('background', 'url(images/close.png) no-repeat center').css('background-size', '100% 100%');*/
            $('.phone-dropdown').removeClass('b');
            $('.phone-dropdown').addClass('d');
        } else {
            n = true;
            /*$(this).css('background', 'url(images/open.jpg) no-repeat center').css('background-size', '100% 100%');*/
            $('.phone-dropdown').removeClass('d');
            $('.phone-dropdown').addClass('b');
        };
    });
});
$(function(){
    $('#about>li').mouseenter(function(){
        $(this).find('a').css('opacity','0').css('opacity','1').addClass('animated flipInX').removeClass('flipOutX');
    });
    $('#about>li').mouseleave(function(){
        $(this).find('a').css('opacity','1').addClass('animated flipOutX').removeClass('flipInX');
    });

    /*控制字符串长度*/
    jQuery.fn.limit=function(self){
        /*var self = $('#new .c_2>p');*/
        self.each(function(){
            var objString = $(this).text();
            var objLength = $(this).text().length;
            var num = 0;
            if($(window).width()>992){
                num=100;
            }else if($(window).width()>768 && $(window).width()<992){
                num=50;
            }else{
                num=20;
            }
            if(objLength > num){
                $(this).attr('title',objString);
                objString = $(this).text(objString.substring(0,num) + '...');
            }
        })
    };
    $(function(){
        $(document.body).limit($('#new .c_2>p'));
        $(document.body).limit($('.case-ceil a>div p'));
    });


    function strLength(obj,n){
        var objStr=obj.text();
        var objLth = obj.text().length;
        if(objLth > n){
            $('.case-ceil a>p').text(objStr.substring(0,n) + '...');
        }
    }
    /*var obj=$('.case-ceil a>p');*/
    // $(function(){
    //     strLength($('.case-ceil a>p'),31);
    //     /*strLength($('.explain-ceil p span'),10);*/
    // });

    /*列表项最后的padding问题*/

    function pLength(obj,n){
        var L=obj.length;
        for(var i=0;i<L;i++){
            if((i+1)%n==0){
                obj.eq(i).css('margin',0);
            }
        };
    };
    if($(window).width()>768){
        pLength($('.case-ceil'),3);
        pLength($('.explain-ceil'),4);
        pLength($('.aptitude-ceil'),4);
    }
});