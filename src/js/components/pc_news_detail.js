import React, { Component } from 'react';
import { Row, Col} from 'antd';
import PCFooter from "./pc_footer";
import PCHeader from "./pc_header"
import PCNewsImageBlock from "./pc_news_image_block";
import CommonComment from "./common_comment";


class PCNewDetail extends Component{

    constructor() {
        super();
        this.state = {
            newsDetail: ''
        }
    }

    componentWillMount() {
        console.log(this.props);
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+ this.props.match.params.uniquekey , {
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
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="article-content" dangerouslySetInnerHTML={{__html : this.state.newsDetail.pagecontent}}></div>
                        <hr />
                        <CommonComment/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={36} cardTitle="娱乐新闻" type='yule' width='100%' imageWidth='112px'/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter/>
            </div>
        );
    }

}

PCNewDetail.defaultProps = {
    uniquekey:161028202106247
}

export default PCNewDetail;