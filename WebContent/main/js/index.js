(function(){

	var timer=null;
	var index=0;
	var path = true;
	var img_width=$('#lunbo img').width();
	//图片轮播
	timer=setInterval(function(){
		sport(1);
	},3000);

	//按键控制图片位置
	$('#lunbo img,.lunbo,.btn_left,.btn_right').hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(function(){
			sport(1);
		},3000);
	});

	$(".lunbo_btn").each(function(i){
		$(this).bind('click',function(){
			$('#lunbo ul').css('left',-i*img_width+'px');
			$(this).css('border-color','#3d3c38');
			$(this).siblings().css('border-color','#ccc');
		});
	});

	//方向按钮控制图像轮播方向
	$('.btn_left').bind('click',function(){
		sport(1);
	});
	$('.btn_right').bind('click',function(){
		sport(-1);

	});


    function sport(m)
	{
		if (m>0) 
		{
			index++;
			if(index>3)	
			{
			index=0;
			
			$('#lunbo ul').css('left','0px');
			index++;
			}		
		}
		if (m<0) 
		{			
			if(index<1)	
			{
			index=3;
			$('#lunbo ul').css('left',-3*img_width+'px');
			}	
			index--;
		}

		$('#lunbo ul').animate({
			left:-index*img_width
		},500);	
		$('#mark>div').eq(index).css('border-color','#3d3c38').siblings().css('border-color','#ccc');
		if (index==3) 
		{
				$('#mark>div').eq(0).css('border-color','#3d3c38');
		 		$('#mark>div').eq(0).siblings().css('border-color','#ccc');
		 };		
	}
	
	
	$('#lunbo').hover(function(){
		$('.btn_turn').fadeIn(200);
	},function(){
		$('.btn_turn').fadeOut(200);
	});
	
	
	$('#services_bottom>div').hover(function(){
		$(this).children('img').addClass('rotate');
		
	},function(){
		$(this).children('img').removeClass('rotate');
	})
})();