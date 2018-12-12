import React ,{Component} from 'react';

class Teat extends Component{
	constructor(props){
		super(props);
		this.state={
			arrTest:[
				{name:"测试"},
				{name:"测试"},
				{name:"测试"},
				{name:"测试"},
				{name:"测试"},
				{name:"测试"},
				{name:"测试"},
				{name:"测试"}
			]
		}
	}
	//懒加载代码实现
var viewHeight = document.documentElement.clientHeight // 可视区域的高度

	lazyload () {
	  	// 获取所有要进行懒加载的图片
	  	var eles = document.querySelectorAll('img[data-original][lazyload]');
	 	Array.prototype.forEach.call(eles, function (item, index) {
	    	var rect;
	    	if (item.dataset.original === '')
	      		return rect = item.getBoundingClientRect();
	    	// 图片一进入可视区，动态加载
	    	if (rect.bottom >= 0 && rect.top < viewHeight) {
	      		!function () {
		        	var img = new Image();
		        	img.src = item.dataset.original;
		        	img.onload = function () {
		          		item.src = img.src
		        	}
		        	item.removeAttribute('data-original')
		        	item.removeAttribute('lazyload')
	      		}
	    	}	
	  	})
	}
	componentWillMount(){
		// 首屏要人为的调用，否则刚进入页面不显示图片
		lazyload();	
	}
	componentDidMount(){
		document.addEventListener('scroll', this.lazyload);
	}
	render(){
		return (
			<div>
				{
					this.state.arrTest.map((item)=>{
						<div key={item.name}>
							<p>
								{item.name}
							</p>
						</div>
					})
				}
			</div>
		)
	}
}













