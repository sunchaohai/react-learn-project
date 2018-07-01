import React, { Component } from 'react';
import { Row, Col} from 'antd';
import MobileFooter from "./mobile_footer";
import MobileHeader from "./mobile_header";
import CommonComment from "./common_comment";


class MobileNewsDetail extends Component{

    constructor() {
        super();
        this.state = {
            newsDetail: ''
        }
    }

    componentWillMount() {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+this.props.match.params.uniquekey, {
            method: 'GET'
        }).then(response => response.json())
            .then((json) => {
                this.setState({newsDetail: json})
            })
            .catch((ex) => console.log('parsing failed', ex))
    };

    render(){
        console.log(this.state.newsDetail)
        return(
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">
                        <div className="article-content" dangerouslySetInnerHTML={{__html : this.state.newsDetail.pagecontent}}></div>
                        <hr/>
                        <CommonComment/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <MobileFooter/>
            </div>
        );
    }

}

MobileNewsDetail.defaultProps = {
    uniquekey:161028202106247
}

export default MobileNewsDetail;