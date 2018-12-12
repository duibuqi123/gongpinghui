import React , {Component} from "react";

import {Reg} from  "./Reg";
import {Login} from "./Login";

class My extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"我是My"
		}
	}
	render(){
		return (
			<Reg/>
		)
	}
}

export {My};













