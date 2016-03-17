/*
* 使用方式:
* $('#wrapper').customSlide(config);
* 
* config对象解释:
pageX:0,         // 横向滑过的页数 默认0  
pageY:0,         // 纵向滑动的页数 默认0
itemWidth:0,      // 每个滑过的元素的宽度 默认0
itemHeight:0,    // 每个滑过的元素的高度 默认0
itemEl:'',       // 每个滑过的元素 传入一个类选择器的字符串  如 .item 
indicator_posX:0,  // 指示条的显示位置起始点基于 item的 左上角 0,0
indicator_posY:0,
indicator_pitch:10,   // 每个指示点之间的间距 像素 默认值:10
indicator_bar:'',      // 单个的指示条上的点 传入一个选择器 selector
indicator_dot:''      // 当前高亮的指示点 同上传入一个selector
speed:1000           // 每滑动一个item的用时 默认:1000 (单位毫秒)

*/
;(function($){

	var customSlide;

	customSlide = (function () {
		
		var opts,container,items;

		function customSlide(element,options) {
			this.settings = $.extend({}, $.fn.customSlide.defaults, options);
			this.$element = $(element);
			opts = this.settings;
			container = this.$element.children().first();
			items = container.children();			
			this.init();
		}

		customSlide.prototype = {
			init: function () {
				if(opts.pageX > 0 && opts.pageY <= 0){
					items.width(opts.itemWidth); 
					container.width(opts.pageX*opts.itemWidth+10);
				}
			},
			next:function () {				
				console.log('next');
				var el = container[0];
				var start_pos = el.offsetLeft;                      
				var end_pos = -opts.itemWidth + el.offsetLeft;      
				if(end_pos > (-container.width() + opts.itemWidth) ){
					var timer;
					var offset = opts.itemWidth*10/opts.speed;   //每次偏移的距离 
					var tmp = -offset+start_pos;
					window.clearInterval(timer);
					timer = window.setInterval(function () {
					 	if(tmp > end_pos){
					 		el.style.left = tmp + 'px';
						 	tmp = -offset + tmp;
						}	
						if( tmp < end_pos && tmp > (end_pos-offset-10) ){
							el.style.left = end_pos +'px';
							window.clearInterval(timer);
						}
						if(tmp == end_pos){
							el.style.left = end_pos +'px';
							window.clearInterval(timer);
						}	
					},10);
				}				
			},
			prev:function () {
				console.log('prev');
				var el = container[0];
				var start_pos = el.offsetLeft;
				var end_pos = el.offsetLeft + opts.itemWidth;
				if(end_pos <= 0 ){
					var timer;
					var offset = opts.itemWidth*10/opts.speed;   //每次偏移的距离
					var tmp = offset+start_pos;
					window.clearInterval(timer);
					timer = window.setInterval(function () {
						if( tmp < end_pos){
							el.style.left = tmp + 'px';
							tmp = offset + tmp;
						}
						if( tmp > end_pos && tmp < (end_pos+offset+10) ){
							el.style.left = end_pos + 'px';
							window.clearInterval(timer);
						}
						if(tmp == end_pos){
							el.style.left = end_pos + 'px';
							window.clearInterval(timer);
						}
					},10);					
				}				
			}
		};

		return customSlide;
	}) ();

	$.fn.customSlide = function (options) {
		return this.each(function () {         // return   从而可以链式调用
			var $this = $(this),
			instance = $.fn.customSlide.lookup[$this.data('customSlide')];   //在dom元素上实例化插件并缓存到dom对象上 
			if(!instance){
				$.fn.customSlide.lookup[++$.fn.customSlide.lookup.i] = new customSlide(this,options);
				$this.data('customSlide',$.fn.customSlide.lookup.i);              // 在dom上写 attr data-custom-slide=1; 标识已初始化实例
				instance = $.fn.customSlide.lookup[$this.data('customSlide')];  
			}
			if(typeof options ==='string'){
				instance[options]();      // 通过传递string的方式调用示例的无参方法
			}
		});
	};

	$.fn.customSlide.lookup = {i: 0};

	$.fn.customSlide.defaults = {
		pageX:0,
		pageY:0,
		itemWidth:0,
		itemHeight:0,
		itemEl:'',
		indicator_posX:0,
		indicator_posY:0,
		indicator_pitch:10,
		indicator_bar:'',
		indicator_dot:'',
		speed:1000
	};

}) (Zepto);