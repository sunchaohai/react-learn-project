import React, {Component} from 'react';
import {Form, Input, Button, Card,notification,Icon,BackTop} from 'antd';

const FormItem = Form.Item;


class CommonComment extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }

    componentWillMount() {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey, {
            method: 'GET'
        }).then(response => response.json())
            .then((json) => {
                this.setState({comments: json})
            })
            .catch((ex) => console.log('parsing failed', ex))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var formData = this.props.form.getFieldsValue;

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark, {method: 'get'})
            .then(response => response.json()).then(json => {
            this.componentWillMount();
        })

    }
    addUserCollection=()=>{
        var formData = this.props.form.getFieldsValue;

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark, {method: 'get'})
            .then(response => response.json()).then(json => {
            //收藏成功以后进行一下全局的提醒
            notification.open({
                message: 'ReactNews提醒',
                description: '收藏文章成功',
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            });
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const commentList = this.state.comments.length > 0
            ?
            this.state.comments.map((item, index) => {
                return <Card key={index} title={item.UserName} extra={<a href="#">发布时间 {item.datetime}</a>} style={{width: '100%'}}>
                    {item.Comments}
                </Card>
            })
            :
            '未加载任何评论'

        return (
            <div>
                {commentList}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label='您的评论'
                    >
                        {getFieldDecorator('remark', {
                            rules: [{required: true, message: '请输入评论!'}],
                        })(
                            <Input type='textarea' placeholder='随便写...' style={{height: '80px'}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            提交评论
                        </Button>
                        <Button
                            type="error" htmlType='button'
                            onClick={this.addUserCollection.bind(this)}
                        >
                            收藏该文章
                        </Button>
                    </FormItem>
                </Form>
                <BackTop />
            </div>
        )
    }
}

CommonComment.defaultProps = {
    uniquekey: 161028202106247
}

export default CommonComment = Form.create()(CommonComment)

