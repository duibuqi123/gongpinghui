import React,{Component} from 'react';
import axios from 'axios';
import { Grid } from 'antd-mobile';
import qs from 'qs';
import LazyLoad from 'react-lazyload';

import '../styles/WordProduct.scss';

class WordProduct extends Component{
	constructor(){
		super();
		this.state={
			arrWordProducts:[]
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
	  	var str='gr_user_id=f1317822-7199-45b2-8e29-6e87d478faca; UM_distinctid=16772a99dad0-08617b6c6f5c6a-43480420-15f900-16772a99daf443; Hm_lvt_908e530051baf6bf8f1099623d31e59c=1543816979; Hm_lpvt_908e530051baf6bf8f1099623d31e59c=1543816979; __xsptplusUT_799=1; __xsptplus799=799.1.1543816979.1543816979.1%232%7Cwww.so.com%7C%7C%7C%25E5%25B7%25A5%25E5%2593%2581%25E6%25B1%2587%7C%23%23x-g3SUTjnahWKFGRT5hhYIBl8kvKnQxC%23; JSESSIONID=6C352D42F19E14CBBE1CE12D7829359C; gr_session_id_ba3a31d1d37e9a75=c2c49451-8be3-4aec-beb2-cacdcfb92f2a; gr_session_id_ba3a31d1d37e9a75_c2c49451-8be3-4aec-beb2-cacdcfb92f2a=true; Hm_lvt_6f3067070d8ff696e50d7c5fd761f28c=1543801937,1543801939,1543816981,1543816984; Hm_lpvt_6f3067070d8ff696e50d7c5fd761f28c=1543816984';
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
			"url": "https://m.vipmro.com/emro_interface/index/mall/getHomeFloors",
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
			return axios.get('/gphapi/emro_interface/index/mall/getHomeFloors',{
				params:{
					t:time,
					platform:5,
					channel:2,
					sign:res.data
				}
			})
		})
		.then((res)=>{
//			console.log(res.data.data);
			this.setState({
				arrWordProducts: res.data.data
			})
//			console.log(this.state.arrWordProducts[0].homeFloorAdvers[0].mobilImg);
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	render(){
		return (
			<div>
				<h2>工品优选</h2>
				{
					this.state.arrWordProducts.map((item)=>{						
						return <div key={item.floorName} style={{borderBottom:"1px solid #dadada"}}>
							<div className="wordProduct-top">
								<img src={item.homeFloorAdvers[0].topImg}/>
							</div>
							<Grid
				            data={item.homeFloorCates} 
				            columnNum={4} 
				            activeClassName="active" 
				            hasLine='false'
				            itemStyle={{height:'50px',padding:'0px'}}
				            renderItem={(one,idx)=>{
				                return(
				                    <div className="goodsItems">
				                        {one.name}
				                    </div>
				                )
				            }}
				            onClick={this.handlerClick.bind(this)}
				            />
				            
							<Grid
				            data={item.homeFloorGoods} 
				            columnNum={2} 
				            activeClassName="active" 
				            hasLine='false'
				            itemStyle={{height:'270px'}}
				            renderItem={(good,idx)=>{
				                return(
				                    <div className="good-list">
				                    	<img src={good.image.split(".jpg")[0]+'!240240.jpg'} style={{width:'156px',height:'156px',borderRadius:"4px",border:"5px #efefef solid",marginBottom:"10px"}} />
				                        <p style={{height:"30px",width:'150px',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden',textAlign:"left",marginLeft:'20px'}}>{good.goodsName}</p>
				                        <p style={{textAlign:'left',marginLeft:"20px",color:'#f03a58',lineHeight:"24px"}}>{'￥'+good.salePrice}</p>
				                    </div>
				                )
				            }}
				            onClick={this.handlerClick.bind(this)}
				            />
				            
							<div style={{width:'100%',background:"#fff"}}>
								<h3 
								style={{color:"#dedede",height:"30px",textAlign:"center",lineHeight:"30px"}}
								>
								—— 推荐品牌 ——
								</h3>
								<div style={{width:'100%',overflow:'scroll',background:"#fff"}}>
									<ul style={{
										width:"1120px",height:"41px",overflow:"scroll"
										}}>
									{
										item.homeFloorBrands.map((res)=>{
											return <li key={res.logo} style={{height:"40px",float:"left",listStyle:"none"}}>
												<img src={res.logo} style={{width:"70px",height:"25px"}} />
											</li>
										})
									}									
									</ul>
								</div>
								
							</div>
						</div>
					})					
				}
				
				<div className="footer">
					<p>苏州工品汇信息科技有限公司</p>
					<p> 苏州工业园区金鸡湖大道1355号A0202</p>
					<p> 联系电话：0512-6286 7379</p>
				</div>
			</div>
		)
	}
}

export {WordProduct};
















