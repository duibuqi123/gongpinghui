import React , {Component} from "react";
import {Header} from "./common/Header";
import {connect} from 'react-redux';
import {cart,tabbar} from '../actions';
import axios from 'axios';
import qs from 'qs';
import {DetailPageContent} from "./DetailPageContents";

import "../styles/DetailPage.scss";
//import {Axios} from "./common/Axios.js";

class DetailPage extends Component{
	constructor(props){
		super(props);
		this.state={
			arrcontents:[],
			arrtabs:[
				{title:"默认"},
				{title:"销量"},
				{title:"价格"},
				{title:"筛选"}
			]
			
		}
	}
	
	componentWillMount(){
//		console.log(this.props)
		this.props.changeTabbarStatus(false);		
	}
	componentDidMount(){
		//默认第一个选中
		var tab=document.getElementsByClassName("tabs")[0];
//			console.log(tab);
		tab.classList.add("styles");
	}
	componentWillUnmount(){
		console.log(this.props)
		this.props.changeTabbarStatus(true);
		
	}
	handlerClick(item,idx){
//		console.log(item,idx);
		var tab=document.getElementsByClassName("tabs");
		for(var i=tab.length-1;i>=0;i--){
			tab[i].classList.remove("styles");
		}
		var tab=document.getElementsByClassName("tabs")[idx];
//		console.log(tab);
		tab.classList.add("styles");
	}
	render(){
		return (
			<div>
				<Header/>
				<div className="detailPage">
				{
					this.state.arrtabs.map((item,idx)=>{
						return <div className="tabs" key={idx} onClick={this.handlerClick.bind(this,item.title,idx)}>{item.title}</div>
					})
				}
				</div>	
				<div className="detailPageContents">
					<DetailPageContent/>
				</div>
				
			</div>
		)
	}
}

let mapStateToProps=state=>({footerStatus:state.commonReducer.footerStatus});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        }
    }
}
DetailPage= connect(mapStateToProps,mapDispatchToProps)(DetailPage);

export {DetailPage};









