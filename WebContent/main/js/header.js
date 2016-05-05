$(function(){
	$('.top01 ul li').each(function(i){
		$(this).hover(function(){
			$(this).css('border-bottom','3px solid #29251c');			
			$(this).siblings().css('border-bottom','');
			$('.top01 ul li a').css('color','#bdb7b2');
			$('.top01 ul li a').eq(i).css('color','#29251c');
		},function(){
			$(this).css('border-bottom','');
			$('.top01 ul li a ').eq(i).css('color','#bdb7b2');
		});
	})
})