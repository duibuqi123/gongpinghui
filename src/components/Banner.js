import React,{Component} from 'react';
import axios from 'axios';
import qs from 'qs';
//轮播图
import { Carousel} from 'antd-mobile';

import '../styles/Home.scss'

class Banner extends Component{
	constructor(props){
		super(props);
		this.state={
			imgHeight:'200px',
			arrImgs:[{},{},{},{},{}]
		}
	}
	//设置cookie
    setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires=" + d.toUTCString();
//	    console.info(cname + "=" + cvalue + "; " + expires);
	    document.cookie = cname + "=" + cvalue + "; " + expires;
//	    console.info(document.cookie);
    }
	componentWillMount(){
		//设置cookie
	  	var str='gr_user_id=f6753842-d6c2-4bee-8949-cfdc9f755696; UM_distinctid=1676467544e6d7-01819c7af628b7-43480420-15f900-16764675450819; __xsptplus799=799.4.1543630276.1543630276.1%232%7Cwww.so.com%7C%7C%7C%25E5%25B7%25A5%25E5%2593%2581%25E6%25B1%2587%25E5%25AE%2598%25E7%25BD%2591%7C%23%23Emu6Ircv4aDB3x-ib0rixHTWPgXH5yFF%23; Hm_lvt_908e530051baf6bf8f1099623d31e59c=1543479094,1543577754,1543577757,1543630277; Hm_lpvt_908e530051baf6bf8f1099623d31e59c=1543630277; JSESSIONID=DDA118A6EA0550516D9AFB8E3D7DF6C5; gr_session_id_ba3a31d1d37e9a75=02365a9b-913b-486e-9c67-b841144bb1b6; gr_session_id_ba3a31d1d37e9a75_02365a9b-913b-486e-9c67-b841144bb1b6=true; Hm_lvt_6f3067070d8ff696e50d7c5fd761f28c=1543632594,1543632596,1543632954,1543632980; Hm_lpvt_6f3067070d8ff696e50d7c5fd761f28c=1543632980';
	  	var arr=str.split('; ');
	//	console.log(arr);
	  	var arr2=[];
		for (var i=0;i<arr.length;i++) {
			arr2=arr[i].split('=');
			this.setCookie(arr2[0],arr2[1],7);
		}
		//当前时间戳
	  	var time=new Date().getTime();
	  	
	  	var con="t="+time+"&platform=5&channel=2";
	  	
		axios.post('/gphapi/sign',
		qs.stringify({
			"url": "https://m.vipmro.com/emro_interface/adver/appMall/5",
			"queryString": con,
			"fromUrl": "?flag=11095757"
		}),
		{
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}			
		})
		.then((res)=>{
//			console.log(res);
			return axios.get('/gphapi/emro_interface/adver/appMall/5',{
				params:{
					t:time,
					platform:5,
					channel:2,
					sign:res.data
				}
			})
		})
		.then((res)=>{
//			console.log(res);
			this.setState({
				arrImgs: res.data.data
			})
//			console.log(this.state.arrImgs);

			
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		return (
	        <Carousel autoplay={true} infinite={true} className="banner" >
	          	{
	          		this.state.arrImgs.map((item,index) => (
			             <a key={index}>
			              	<img src={item.mImage} onLoad={() => {
			                  	window.dispatchEvent(new Event('resize'));
			                 	this.setState({ imgHeight: 'auto' });
			                }} />
			            </a>
		          	))
	         	}
	        </Carousel>
		)
	}
}

export {Banner};









