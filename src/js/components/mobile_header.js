import React, {Component} from 'react';
import {Row, Col, Menu, Icon, Modal, Form, Input, Button, Tabs, message} from 'antd';
import logo from '../../imgs/logo.png'
import {Link} from 'react-router-dom'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisable: false,
            haveLogin: false,
            action: 'login',
            userNickName: '',
            userId: 0
        }
    }

    login = (e) => {
        this.setModalVisable(true)
    }

    setModalVisable(value) {
        this.setState({
            modalVisable: value
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields();//校验
        var formData = this.props.form.getFieldsValue();//获取form表单数据
        console.log(formData)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&repassword=" + formData.repassword)
            .then((response) => {
                return response.json()
            }).then((json) => {
            console.log('parsed json', json)
            this.setState({
                userNickName: json.NickName,
                userId: json.userId,
                haveLogin: true
            });
            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;
            this.setModalVisable(false)
        }).catch((ex) => {
            console.log('parsing failed', ex)
        })

    }
    callback = (key) => {
        if (key === 1) {
            this.setState({action: 'login'});
        } else if (key === 2) {
            this.setState({action: 'register'});
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const userShow = this.state.haveLogin
            ?
            <Link to={`/usercenter`}>
                <Icon type='inbox'></Icon>
            </Link>
            :
            <Icon type='setting' onClick={this.login.bind(this)}></Icon>
        return (
            <div id='mobileHeader'>
                <header>
                    <Link to='/'>
                        <img src={logo} align="logo"/>
                        <span>ReactNews</span>
                        {userShow}
                    </Link>
                </header>
                <Modal
                    title="用户中心"
                    visible={this.state.modalVisable}
                    onOk={() => this.setModalVisable(false)}
                    onCancel={() => this.setModalVisable(false)}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose='true'
                >
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="登陆" key="1">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem label='帐户'>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: '请输入您的帐号'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="请输入您的帐号"/>
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入你的密码'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="请输入你的密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size='small' className="login-form-button">
                                        登陆
                                    </Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label='帐户'>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: '请输入您的帐号'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="请输入您的帐号"/>
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入你的密码'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="请输入你的密码"/>
                                    )}
                                </FormItem>
                                <FormItem label='确认密码'>
                                    {getFieldDecorator('repassword', {
                                        rules: [{required: true, message: '请输入你的确认密码'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="请输入你的确认密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size='small' className="login-form-button">
                                        注册
                                    </Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>

                </Modal>
            </div>
        );
    }

}

export default MobileHeader = Form.create()(MobileHeader)