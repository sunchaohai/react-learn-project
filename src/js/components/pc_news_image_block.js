import React, {Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom'

class PCNewsImageBlock extends Component {
    static﻿defaultProps = {
        cardTitle: '国际新闻',
        type: 'guoji',
        width: '400px',
        imageWidth: '112px',
        count: 10

    }

    constructor() {
        super();
        this.state = {
            news: ''
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
        const styleImg = {
            display: 'block',
            width: this.props.imageWidth,
            height: '90px'
        }
        const styeH3 = {
            width: this.props.imageWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
        const {news} = this.state;
        const newList = news.length
            ?
            news.map((item, index) => (
                <div key={index} className="imageblock">
                    <Link to={`/details/${item.uniquekey}`} target="_blank">
                        <div className="customer-image">
                            <img style={styleImg} src={item.thumbnail_pic_s} alt=''/>
                        </div>
                        <div className='custom-card'>
                            <h3 style={styeH3}>{item.title}</h3>
                            <p>{item.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            : '未加载任何新闻'
        return (
            <div className="topNewsList">
                <Card title={this.props.cardTitle} bordered={true}
                      style={{
                          width: this.props.width
                      }}
                >
                    {newList}
                </Card>
            </div>
        );
    }

}

export default PCNewsImageBlock;