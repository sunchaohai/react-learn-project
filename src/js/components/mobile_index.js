import React, { Component } from 'react';
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import {Tabs} from 'antd'
import MobileList from "./mobile_list";
import CarouselImg from "./carousel_img";
const TabPane = Tabs.TabPane;


class MobileIndex extends Component{
    constructor(){
        super();
        this.state = {
            mode:'top'
        }
    }
    render(){
        return(
           <div>
               <MobileHeader/>
               <Tabs
                   defaultActiveKey="1"
                   tabPosition={this.state.mode}
               >
                   <TabPane tab="头条" key="1">
                       <CarouselImg/>
                       <MobileList type='top' count={10}/>
                   </TabPane>
                   <TabPane tab="社会" key="2">Content of tab 2</TabPane>
                   <TabPane tab="国内" key="3">Content of tab 3</TabPane>
                   <TabPane tab="国际" key="4">Content of tab 4</TabPane>
                   <TabPane tab="娱乐" key="5">Content of tab 5</TabPane>
                   <TabPane tab="体育" key="6">Content of tab 6</TabPane>
                   <TabPane tab="科技" key="7">Content of tab 7</TabPane>
                   <TabPane tab="时尚" key="8">Content of tab 8</TabPane>
               </Tabs>
               <MobileFooter/>
           </div>
        );
    }

}

export default MobileIndex;