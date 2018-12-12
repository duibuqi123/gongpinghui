import React , {Component} from "react";
import axios from 'axios';
import qs from 'qs';

import  "../styles/DetailPageContents.scss";

class DetailPageContent extends Component{
	constructor(props){
		super(props);
		this.state={
			arrcontents:[]
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
	componentWillMount() {
		//隐藏底部组件
//		this.props.changeTabbarStatus(false);
		//设置cookie
		var str = "UM_distinctid=167819d8ea90-041658ec840caf-43480420-15f900-167819d8ead1e0; gr_user_id=88f5a153-3b27-46e2-89ed-fe5bb75c5272; lg_=lgOcGpoudL; Hm_lvt_dd5339bc2fb909694c2ddf9a84a97be0=1544144397,1544145099,1544145104,1544335153; Hm_lpvt_dd5339bc2fb909694c2ddf9a84a97be0=1544335153; Qs_lvt_61680=1544144393%2C1544144397%2C1544145099%2C1544145104%2C1544335152; Qs_pv_61680=2695805682437662000%2C4097171057835236000%2C3478264003027104300%2C2940981283370504700%2C3576208073582019600; __xsptplus799=799.6.1544335153.1544335153.1%232%7Cwww.so.com%7C%7C%7C%25E5%25B7%25A5%25E5%2593%2581%25E6%25B1%2587%7C%23%23u44jwG55G4emNCdxxau11hTfQU0kD7tI%23; Hm_lvt_908e530051baf6bf8f1099623d31e59c=1544144398,1544145100,1544145105,1544335154; Hm_lpvt_908e530051baf6bf8f1099623d31e59c=1544335154; JSESSIONID=E0D3C3692E4F794FFF4E1ECDE3DB7445; gr_session_id_ba3a31d1d37e9a75=402eadef-cfeb-48df-ab50-0291eb98452c; gr_session_id_ba3a31d1d37e9a75_402eadef-cfeb-48df-ab50-0291eb98452c=false; Hm_lvt_6f3067070d8ff696e50d7c5fd761f28c=1544335156,1544336412,1544340039,1544347282; Hm_lpvt_6f3067070d8ff696e50d7c5fd761f28c=1544347282";
		var arr = str.split('; ');
		//	console.log(arr);
		var arr2 = [];
		for(var i = 0; i < arr.length; i++) {
			arr2 = arr[i].split('=');
			this.setCookie(arr2[0], arr2[1], 7);
		}
		//当前时间戳
		var time = new Date().getTime();

		var con = "categoryId=541110&t=" + time + "&platform=5&channel=2";
		//请求数据
		axios.post('/gphapi/sign',
			qs.stringify({
				"url": "https://m.vipmro.com/emro_interface/goods/search/mall/app/1/10",
				"queryString": con,
				"fromUrl": "list?categoryId=541110"
			}), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
		.then((res) => {
			//			console.log(res);
			return axios.get('/gphapi/emro_interface/goods/search/mall/app/1/10', {
				params: {
					categoryId: 541110,
					t: time,
					platform: 5,
					channel: 2,
					sign: res.data
				}
			})
		})
		.then((res) => {
			console.log(res.data.goodsList);
			this.setState({
				arrcontents:res.data.goodsList
			})
			console.log("11",this.state.arrcontents);
		})
		.catch((err) => {
			console.log(err);
		})		
	}
	render(){
		return (
			<div>
				{
					this.state.arrcontents.map((item,idx)=>{
						return <div key={idx} className="DetailPageContents">
							<div className="DetailPageContents-left">
								<img src={item.image.split(".jpg")[0]+"!240240.jpg"} />
							</div>
							
							<div className="DetailPageContents-right">
								<h3>{item.goodsName}</h3>
								<p>订货号:{item.buyNo}</p>
								<p>货期:{item.delivery}</p>
								<p>
								￥
								<span>{(item.price).substring(2)}</span>
								/
								{item.measure}
								&nbsp;&nbsp;<del>{item.marketPrice}</del>
								</p>
							</div>
						</div>
					})
				}
			</div>
		)
	}
}

export {DetailPageContent};




                                        






