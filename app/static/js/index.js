;(function($, banners,next ,prev){
	var banners = $(banners),
		next = $(next),
		prev = $(prev),
		len = banners.length,
		num = 0,
		control = '<div class="controls"></div>',
		oi = '<i></i>',
		timer = null;
	$(banners).parents('#banner').find('.layout').prepend(control);
	$.each(banners,function(i){
		$('.controls').append(oi);
		if(len==0){$('.controls i').eq(0).addClass('now')}
	});
	var controls = $('.controls i');
	if ( controls.length == 1 ) { controls.hide(); }
	run(0);
	autoPlay(num);
	$(banners, controls).on({ mouseover:function(){ clearInterval( timer ); },mouseout: function(){num = controls.parent().find('.now').index();autoPlay(num);} });
	controls.on('click', function(){clearInterval( timer ); num = $(this).index(); run(num); });
	next.on('click',function(){clearInterval( timer );num = controls.parent().find('.now').index();brNext(num);});
	prev.on('click',function(){clearInterval( timer );num = controls.parent().find('.now').index();brprev(num);});
	function init(i){
		controls.eq(i).addClass('now').siblings().removeClass('now');
		banners.eq(i).stop().animate({'opacity':1}, 300).siblings().stop().animate({'opacity':0}, 300);
	};
	function run(cur_i){
		init(cur_i);
		banners.each(function(i, ele){ banners.eq(i).css('z-index',i >= cur_i ? len-i+cur_i : cur_i-i); });
	};
	function autoPlay(num){
		timer = setInterval(function(){
			num++;
			if( num >= len ){ num = 0; };
			run(num);
		}, 3000);
	};
	function brNext(n){
		n++;n >= len ? n = 0 : n; run(n);
	};
	function brprev(n){
		n--; n <= -1 ? n = len-1 : n; run(n);
	}
})(jQuery, '#banner li','#banner .next','#banner .prev');

;(function($,box,item){
	function boxmove(){
		$(item).show();
		$(item).first().slideUp(1000,function(){
		 	$(box).append($(item).first());	
		});
	}
	timer = setInterval(boxmove,3000);
	$('.announcement_box').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(boxmove,3000);
	});

})(jQuery,'.announcement-slideup','.announcement-slideup li');

;(function($,oli){
	var oli = $(oli).children('a'),
		oprice = '',
		opoints = '',
		omask = '';
	oli.hover(function(){
		oprice = $(this).data('price');
		opoints = $(this).data('points');
		omask = '<div class="omask"><p class="omask_price">原价<s>'+oprice+'元</s></p><p class="omask_points">仅需<em>'+opoints+'</em>积分</p><p class="omask_details"><strong>查看详情</strong></p></div>';
		$(this).append(omask);
	},function(){
		$('.omask').remove();
	});
})(jQuery,'.list_bd li:not(.first)');

;(function($,navsid){
	var navsid = $(navsid),
		speed = 600,
		name = null,
		timeout = false;
		navsid.on('click',function(){
			navsid.removeClass('active');
			$(this).addClass('active');
			name = $(this).attr('href');
			$('body,html').animate({ scrollTop: $(name).offset().top }, speed);	
		});
		parseInt($(window).scrollTop()) > 120 ?  $('.nav_sidebar_left').css({marginTop:0}) : $('.nav_sidebar_left').css({marginTop:120});
		$(window).scroll(function() {
			if (timeout){clearTimeout(timeout);}
			timeout = setTimeout(function(){
				parseInt($(window).scrollTop()) > 120 ?  $('.nav_sidebar_left').css({marginTop:0}) : $('.nav_sidebar_left').css({marginTop:120});	
					navsid.each(function(i){
			 		var oname = navsid.eq(i).attr('href'),
			 		oftop = parseInt($(oname).offset().top),
			 		oltop = parseInt($('.nav_sidebar_left').find('li').eq(i).offset().top),
			 		scrot = parseInt($(window).scrollTop());
			 		if((oftop-oltop)<  1 && (oftop-scrot)>=-200){ 
			 			navsid.removeClass('active');
			 			navsid.eq(i).addClass('active');
			 		}
			 	});
			},5);
		});
})(jQuery,'.nav_sidebar_left li:not(:last-child) a');
