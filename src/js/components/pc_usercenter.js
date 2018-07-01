import React, { Component } from 'react';
import { Row, Col, Card, Upload,Tabs,Modal,Icon,message} from 'antd';
import PCHeader from './pc_header'
import PCFooter from "./pc_footer";

const TabPane = Tabs.TabPane;

class PCUserCenter extends Component{
    constructor() {
        super();
        this.state = {
            userCollection: [],
            userComments:[],
            previewImage:'',
            previewVisible:false

        }
    }

    componentWillMount() {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userid, {
            method: 'GET'
        }).then(response => response.json())
            .then((json) => {
                this.setState({userCollection: json})
            })
            .catch((ex) => console.log('parsing failed', ex))


        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, {method:'GET'})
            .then(response=>response.json())
            .then(json=>{
                this.setState({userComments:json});
            });
    }

    handleCancel(){
        this.setState({previewVisible:false});
    }
    handleOk(){
        this.setState({previewVisible:false});
    }
    render(){
        //用户收藏评论
        const commentList = this.state.userComments.length > 0
            ?
            this.state.userComments.map((item, index) => {
                return <Card key={index} title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`}
                             extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>}>
                    <p>{item.Comments}</p>
                </Card>
            })
            :
            '未加载任何评论';

        //用户收藏文章
        const userList = this.state.userCollection.length > 0
            ?
            this.state.userCollection.map((item, index) => {
                return <Card key={index} title={item.uniquekey} extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>} style={{width: '100%'}}>
                    <p>{item.Title}</p>
                </Card>
            })
            :
            '未加载任何文章'

            const props = {
                action: 'http://newsapi.gugujiankong.com/handler.ashx',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                listType: 'picture-card',
                defaultFileList: [
                    {
                        uid: -1,
                        name: 'xxx.png',
                        state: 'done',
                        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                    }
                ],
                onPreview: (file) => {
                    this.setState({previewImage: file.url, previewVisible: true});
                }
            };
        return(
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {userList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {commentList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>


                <PCFooter/>
            </div>
        );
    }

}

PCUserCenter.defaultProps = {
    userid:1
}

export default PCUserCenter