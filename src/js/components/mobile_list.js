import React, {Component} from 'react';
import {Row, Col} from 'antd'
import {Link} from 'react-router-dom'
import CarouselImg from "./carousel_img";


class MobileList extends Component {
    constructor() {
        super();
        this.state = {
            news: []
        }
    }

    componentWillMount() {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, {
            method: 'GET'
        }).then(response => response.json())
            .then((json) => {
                this.setState({news: json})
            })
            .catch((ex) => console.log('parsing failed', ex))
    }

    render() {
         const newsList = this.state.news.length > 0
            ?
            this.state.news.map((item,index)=>{
                return <section key={index} className='m_article list-item sepcial_section clearfix'>
                    <Link to={`details/${item.uniquekey}`}>
                        <div className='m_article_img'>
                            <img src={item.thumbnail_pic_s} alt=""/>
                        </div>
                        <div className='m_article_info'>
                            <div className='m_article_title'>
                                <span>{item.title}</span>
                            </div>
                            <div className='m_article_desc clearfix'>
                                <span className='m_article_channel'>{item.type}</span>
                                <span className='m_article_time'>{item.date}</span>
                            </div>
                        </div>
                    </Link>
                </section>
            })
            :
            '未加载任何新闻'

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        );
    }

}

export default MobileList;