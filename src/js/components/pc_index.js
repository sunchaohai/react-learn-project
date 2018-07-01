import React, { Component } from 'react';
import PCHeader from './pc_header';
import PCFooter from "./pc_footer";
import PCNewContainer from "./pc_newscontainer";
class PCIndex extends Component{
    render(){
        return(
            <div>
                <PCHeader/>
                <PCNewContainer/>
                <PCFooter/>
            </div>
        );
    }

}

export default PCIndex;