import React, {Component} from 'react';
import {Row, Col} from 'antd'
import {Link} from 'react-router-dom'
import Tloader from 'react-touch-loader'

class MobileList extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            canRefreshResolve: 1,
            listLen: 0,
            hasMore: 0,
            initializing: 1,
            refreshedAt: Date.now(),
            autoLoadMore:true
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
    loadMore(resolve) {
        setTimeout(() => {
            var l = this.state.listLen + 9;

            this.setState({
                listLen: l,
                hasMore: l > 0 && l < 20
            });
            fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.state.listLen, {
                method: 'GET'
            }).then(response => response.json())
                .then((json) => {
                    this.setState({news: json})
                    resolve();
                })
                .catch((ex) => {console.log('parsing failed', ex)})

        }, 2e3);
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                listLen: 9,
                hasMore: 1,
                initializing: 2, // initialized
            });
        }, 2e3);
    }
    handleRefresh(resolve, reject){
        alert('aaa')
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule&count=' + this.props.count, {
            method: 'GET'
        }).then(response => response.json())
            .then((json) => {
                this.setState({news: json})
            })
            .catch((ex) => {console.log('parsing failed', ex),reject()})
        resolve();
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
        const {hasMore,initializing} = this.state;

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Tloader className="main"
                                 onLoadMore={(resolve) => this.loadMore(resolve)}
                                 hasMore={hasMore}
                                 autoLoadMore={this.state.autoLoadMore}
                                 initializing={initializing}>
                                {newsList}
                        </Tloader>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default MobileList;