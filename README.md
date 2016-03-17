# slide
a javascript lib with zepto,it is a simply plugin of my diy for my re-use.

这是一个滑屏的js插件,zepto插件(所以当然它也兼容jquery)<br>
源自实际开发过程遇到的一个很常见的需求,(手机端 web页面的局部或全部的手势滑屏),而在一段时间里我并没有找到合适的js库,<br>
于是我干脆自己写一个(本来并不想重复造轮子的,这种类似的插件用心找一找,比我这个功能全而强大的必然也有一大堆)<br>
所以初心是极简极少的配置,几k左右的轻量化的体积,实现正确单一的需求<br>
这样我可以快速灵活的加入任何一个项目中,同时隐蔽从而不用每次去思考那些事件和计算,位置,之间应有的负责关系和逻辑关联

正确单一的需求的意思 (适用场景):<br>
1.移动端友好<br>
2.支持横屏的指定宽度和高度的内容区域的横向滚动,(用来做轮播图或者响应用户左右划的手势,可选带上指示点(条))<br>
整屏宽度划动传入相应的屏幕宽度即可或者通过某个初始化配置项告诉插件使用整屏宽度<br>
3.支持指定宽度和高度内的内容区域的纵向滚动,(用来做例如刚好一屏高度的上下划动)<br>
note: (内容区域本身的宽高不限,内容区域内的元素一次手势滑动整屏高度或者整屏宽度)<br>          所谓整屏高度和整屏宽度会随用户的设备不同而相应改变


实现的原理:
有两个不同的原理实现的版本,它们用不同的tag标明并在不同的分支上进行并行的开发 <br>

1.使用js操控position:absolute;的元素的位置(left top)模拟滑屏的效果,通过js来进行多次间隔执行的位移(window.setInterval),<br>
由于电脑屏幕上每秒60fps(帧)的变化就不会让人觉得闪烁和卡顿,所以一次滑屏过程中执行的间隔被默认设定为低于15ms<br> (在实现相应功能和修复bug中../)<br>

2.使用css3 transform来进行的轴的位移,过程中使用css animation的方式而来操作元素的位移 (待开发中)
