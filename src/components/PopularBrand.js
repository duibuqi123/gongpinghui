import React,{Component} from 'react';
import axios from 'axios';
import { Grid } from 'antd-mobile';
import qs from 'qs';

import '../styles/PopularBrand.scss';

class PopularBrand extends Component{
	constructor(){
		super();
		this.state={
			arrFenLei_top:[],
			arrFenLei_bottom:[]
		}
	}
	handlerClickTop(){
		
	}
	handlerClickBottom(){
		
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
	  	var str='JSESSIONID=9024FD15FAF12D0A61ADF3671135B865; gr_user_id=f1317822-7199-45b2-8e29-6e87d478faca; gr_session_id_ba3a31d1d37e9a75=5abf63a4-836c-40f4-abcf-d8d5b310815d; gr_session_id_ba3a31d1d37e9a75_5abf63a4-836c-40f4-abcf-d8d5b310815d=true; Hm_lvt_6f3067070d8ff696e50d7c5fd761f28c=1543649681,1543652927,1543652939,1543653019; Hm_lpvt_6f3067070d8ff696e50d7c5fd761f28c=1543653019';
	  	var arr=str.split('; ');
	//	console.log(arr);
	  	var arr2=[];
		for (var i=0;i<arr.length;i++) {
			arr2=arr[i].split('=');
			this.setCookie(arr2[0],arr2[1],7);
		}
		//当前时间戳
	  	var time=new Date().getTime();
	  	
	  	var con="terminalType=5&t="+time+"&platform=5&channel=2";
	  	//请求数据
		axios.post('/gphapi/sign',
		qs.stringify({
			"url": "https://m.vipmro.com/emro_interface/category/mobMall/choice",
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
			return axios.get('/gphapi/emro_interface/category/mobMall/choice',{
				params:{
					terminalType: 5,
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
				arrFenLei_top: res.data.data.slice(0,2),
				arrFenLei_bottom:res.data.data.slice(2)
			})
//			console.log(this.state.arrFenLei_top,this.state.arrFenLei_bottom);
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		return (
			<div className="Pop">
				<h2>热门品类</h2>
				<Grid
	            data={this.state.arrFenLei_top} 
	            columnNum={2} 
	            activeClassName="active" 
	            renderItem={(item,idx)=>{
	                return(
	                    <div className="goods-item-top">
	                        <img src={item.imageUrl}/>
	                        <h4>{item.mainTitle}</h4>
	                        <p>{item.subTitle}</p>
	                    </div>
	                )
	            }}
	            onClick={this.handlerClickTop.bind(this)}
	            />
				<Grid
	            data={this.state.arrFenLei_bottom} 
	            columnNum={4} 
	            activeClassName="active" 
	            renderItem={(item,idx)=>{
	                return(
	                    <div className="goods-item-bottom">	                        
	                        <h4>{item.mainTitle}</h4>
	                        <p>{item.subTitle}</p>
	                        <img src={item.imageUrl}/>
	                    </div>
	                )
	            }}
	            onClick={this.handlerClickBottom.bind(this)}
	            />
			</div>
		)
	}
}

export {PopularBrand};













