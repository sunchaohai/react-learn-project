import React, {Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom'

class PCNewsBlock extends Component {
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
        const {news} = this.state;
        const newList = news.length
            ?
            news.map((item, index) => (
                <li key={index}>
                    <Link to={`/details/${item.uniquekey}`} target="_blank">
                        {item.title}
                    </Link>
                </li>
            ))
            : '未加载任何新闻'

        return (
            <div className='topNewsList'>
                <Card style={{
                    width: this.props.width
                }}>
                    <ul>
                        {newList}
                    </ul>
                </Card>

            </div>
        );
    }

}

export default PCNewsBlock;