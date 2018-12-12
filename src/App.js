import React, { Component } from 'react';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {cart,tabbar} from './actions';
import 'antd-mobile/dist/antd-mobile.css';
import './styles/App.scss'

import {Home} from './components/Home';
import {Classify} from './components/Classify';
import {Cart} from './components/Cart';
import {My} from './components/My';
import {DetailPage} from './components/DetailPage';
import {NotFound} from './components/NotFound';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faUser,faShoppingCart,faSearch} from '@fortawesome/free-solid-svg-icons';

library.add(faHome,faUser,faShoppingCart,faSearch);


class App extends Component {
	constructor(props){
		super(props);
		this.state={
			currentTab:0,
			tabs:[
				{
					title:"首页",
					path:"/Home",
					icon:"home"
				},
				{
					title:"选型",
					path:"/Classify",
					icon:"search"
				},
				{
					title:"购物车",
					path:"/Cart",
					icon:"shopping-cart"
				},
				{
					title:"我的",
					path:"/My",
					icon:"user"
				}
			]
		}
	}
	//点击切换组件页面
	handlerClick(idx,path){
		this.setState({currentTab:idx});
		//编程式导航
		//获取history
		this.props.history.push(path);
	}
	//使路径链接跟随着组件页面的变化而变
	componentWillMount(){
		//获取hash
//		console.log(this.props)
		let hash=window.location.hash.slice(1);
		let currentTab=0;
		this.state.tabs.some((item,idx)=>{
			currentTab=idx;
			return item.path===hash;
		})
		this.setState({currentTab})
	}
	
  render() {
    return (
      <div className="App">
      	<div className="main">
	        <Switch>
            <Route path="/Home" component={Home} />
            <Route path="/Classify" component={Classify} />
            <Route path="/Cart" component={Cart} />
            <Route path="/My" component={My} />
            <Route path="/DetailPage/:id" component={DetailPage} />
            <Route path="/404" component={NotFound} />
            <Redirect from="/" to="/home" exact/>
            <Redirect to="/404"/>
	        </Switch>
        </div>
        
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#f00"
          hidden={!this.props.footerStatus}
          barTintColor="white"
          noRenderContent="true"
        >
          {
  			this.state.tabs.map((tab,idx)=>{
	  			return <TabBar.Item
		            title={tab.title}
		            key={tab.path}
		            icon={<FontAwesomeIcon icon={tab.icon}/>}
		            selectedIcon={<FontAwesomeIcon icon={tab.icon}/>}
		            selected={this.state.currentTab === idx}
		            onPress={this.handlerClick.bind(this,idx,tab.path)}
		            
		          	>
	            {tab.title}
	          </TabBar.Item>
          	})
          }
        </TabBar>
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

App = connect(mapStateToProps,mapDispatchToProps)(App)
App=withRouter(App);
export default App;
