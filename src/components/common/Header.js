import React,{Component} from 'react';

//搜索框
import { SearchBar} from 'antd-mobile';

import '../../styles/Header.scss';

class Header extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"我是Header"
		}
	}
	render(){
		return <div className="Header">
			<SearchBar placeholder="Search"/>
		</div>
	}
}

export {Header};










