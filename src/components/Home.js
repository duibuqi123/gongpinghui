import React,{Component} from 'react';
import LazyLoad from 'react-lazyload';

//搜索框
import { Header} from './common/Header.js';
//轮播图
import {Banner} from './Banner.js';
//品牌分类
import {HomeFenLei} from './HomeFenLei.js';
import {HomeFenLeiPinPai} from './HomeFenLeiPinPai.js';
import {PopularBrand} from './PopularBrand.js';
import {SelectBrands} from './SelectBrands.js';
import {WordProduct} from './WordProduct.js';

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"我是Home"
		}
	}
	//监听滚动条事件
	
	
	render(){
		return (
			<div className="Home">
				{<Header/>}
				{<Banner/>}
				{<HomeFenLei/>}
				{<HomeFenLeiPinPai/>}
				{<PopularBrand/>}
				{<SelectBrands/>}
				{
					<LazyLoad height={5000}>
						{<WordProduct/>}
					</LazyLoad>
				}
			</div>
		)
	}
}

export {Home};













