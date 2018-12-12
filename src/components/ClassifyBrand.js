import React, {Component} from 'react';
import {Roue,withRouter} from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import "../styles/ClassifyBrand.scss";

class ClassifyBrand extends Component{
	constructor(){
		super();
		this.state={
			arrFirst:[],
			arrBrand:[],
			arrFenLei:[]
		}
	}
	handlerClick(id){
//		console.log(id);
		var {history}=this.props;
		history.push({pathname:"DetailPage/"+id});
//		console.log(this.props);
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
	  	var str='gr_user_id=f1317822-7199-45b2-8e29-6e87d478faca; UM_distinctid=16772a99dad0-08617b6c6f5c6a-43480420-15f900-16772a99daf443; Hm_lvt_908e530051baf6bf8f1099623d31e59c=1543816979,1543886698; Hm_lpvt_908e530051baf6bf8f1099623d31e59c=1543886698; __xsptplus799=799.2.1543886698.1543886698.1%232%7Cwww.so.com%7C%7C%7C%25E5%25B7%25A5%25E5%2593%2581%25E6%25B1%2587%7C%23%23xukegA7GDIAFAsWdrttxTC9dLxirrPe-%23; JSESSIONID=71404808B393A68C00118D7A16C3F042; gr_session_id_ba3a31d1d37e9a75=1cf2cae9-c153-4a3a-8d43-3fb9d2a9b26e; gr_session_id_ba3a31d1d37e9a75_1cf2cae9-c153-4a3a-8d43-3fb9d2a9b26e=true; Hm_lvt_6f3067070d8ff696e50d7c5fd761f28c=1543888397,1543894465,1543894470,1543894471; Hm_lpvt_6f3067070d8ff696e50d7c5fd761f28c=1543894471';
	  	var arr=str.split('; ');
	//	console.log(arr);
	  	var arr2=[];
		for (var i=0;i<arr.length;i++) {
			arr2=arr[i].split('=');
			this.setCookie(arr2[0],arr2[1],7);
		}
		//当前时间戳
	  	var time=new Date().getTime();
	  	
	  	var con="channelCode=2&t="+time+"&platform=5&channel=2";
	  	//请求数据
		axios.post('/gphapi/sign',
		qs.stringify({
			"url": "https://m.vipmro.com/emro_interface/category/app/selectCategory",
			"queryString": con,
			"fromUrl": "category"
		}),
		{
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}			
		})
		.then((res)=>{
//			console.log(res);
			return axios.get('/gphapi/emro_interface/category/app/selectCategory',{
				params:{
					channelCode: 2,
					t:time,
					platform:5,
					channel:2,
					sign:res.data
				}
			})
		})
		.then((res)=>{
//			console.log(res.data.data);
			let arrFirst=res.data.data[0];
//			console.log(arrFirst);
			let data=arrFirst.brand;
			let childrens=arrFirst.childrens;
			if(childrens&&data){
				this.setState({
					arrBrand: data,
					arrFenLei:childrens
				})
			}
//			console.log(this.state);	
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	componentWillReceiveProps(props){	
//		console.log(props);
		let data=props.data.brand;
		let childrens=props.data.childrens;
		if(childrens&&data){
//			console.log(data,childrens);
			this.setState({
				arrBrand:data,
				arrFenLei:childrens
			})	
		}
//		console.log(this.state.arrFenLei);
	}
	render(){
		return (			
			<div>
				<div className="FenLeiTop">
					<h3>推荐品牌</h3>
					{
						this.state.arrBrand.map((item)=>{
							return <div className="logo" key={item.logo}>
								<img src={item.logo} />
							</div>
						})
					}
				</div>
				<div className="FenLeiBottom">
					{
						this.state.arrFenLei.map((item)=>{
							return (
								<div key={item.name}>
									<h3>{item.name}</h3>
									<div className="divfenlei">
										{
											item.childrens.map((it)=>{
												return <a key={it.id} className="fenlei" onClick={this.handlerClick.bind(this,it.cateNo)}>{it.name}</a>
											})
										}
									</div>
								</div>								
							)							
						})
					}
				</div>
			</div>
		)
	}
}
ClassifyBrand=withRouter(ClassifyBrand);
export {ClassifyBrand};









