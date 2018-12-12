import React,{Component} from 'react';
import axios from 'axios';
import { Grid } from 'antd-mobile';
import qs from 'qs';

import '../styles/HomeFenLei.scss';

class HomeFenLei extends Component{
	constructor(){
		super();
		this.state={
			arrFenLei:[]
		}
	}
	handlerClick(){
		
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
	  	var str='JSESSIONID=9024FD15FAF12D0A61ADF3671135B865; gr_user_id=f1317822-7199-45b2-8e29-6e87d478faca; gr_session_id_ba3a31d1d37e9a75=fe3c5213-5edc-434a-8faa-a2f6d7708a6e; gr_session_id_ba3a31d1d37e9a75_fe3c5213-5edc-434a-8faa-a2f6d7708a6e=true';
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
	  	//请求数据
		axios.post('/gphapi/sign',
		qs.stringify({
			"url": "https://m.vipmro.com/emro_interface/index/m/getMallFunctionIcons",
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
			return axios.get('/gphapi/emro_interface/index/m/getMallFunctionIcons',{
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
				arrFenLei: res.data.data.functionIcons
			})
//			console.log(this.state.arrFenLei);
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		return (
			<div>
				<Grid
	            data={this.state.arrFenLei} 
	            columnNum={4} 
	            activeClassName="active" 
	            renderItem={(item,idx)=>{
	                return(
	                    <div className="goods-item">
	                        <img src={item.icon}/>
	                        <p>{item.title}</p>
	                    </div>
	                )
	            }}
	            onClick={this.handlerClick.bind(this)}
	            />
				
			</div>
		)
	}
}

export {HomeFenLei};













