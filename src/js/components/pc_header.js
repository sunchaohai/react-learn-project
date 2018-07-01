import React, { Component } from 'react';
import { Row, Col, Menu, Icon,Modal,Form,Input,Button,Tabs,message} from 'antd';
import logo from '../../imgs/logo.png'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends Component{
    constructor(){
        super();
        this.state = {
            current:'top',
            modalVisable:false,
            haveLogin:false,
            action:'login',
            userNickName:'',
            userId:0
        }
    }
    handleClick = (e)=>{
        console.log(e.key === 'login')
        this.setState({
            current:e.key
        });
        if(e.key === 'login' || e.key === 'register'){
           this.setModalVisable(true)
        }
    }
    setModalVisable(value){
        this.setState({
            modalVisable:value
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields();//校验
        var formData = this.props.form.getFieldsValue();//获取form表单数据
        console.log(formData)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&repassword="+formData.repassword)
            .then((response)=> {
                return response.json()
            }).then((json) => {
                console.log('parsed json', json)
                this.setState({
                    userNickName:json.NickName,
                    userId:json.userId,
                    haveLogin:true
                });
                localStorage.userid= json.UserId;
                localStorage.userNickName = json.NickUserName;
                this.setModalVisable(false)
            }).catch((ex) => {
                console.log('parsing failed', ex)
            })

    }
    callback = (key) => {
        if(key === 1){
            this.setState({action:'login'});
        }else if(key === 2){
            this.setState({action :'register'});
        }
    }
    logout = () =>{
        this.setState({
            haveLogin:false
        });
        message.success('退出成功！')
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const userShow = this.state.haveLogin
            ?
            <Menu.Item key="mail">
                <Button type="primary">钱包</Button>
                &nbsp;&nbsp;
                    <Button type="dashed">个人中心</Button>
                &nbsp;&nbsp;
                <Button type='ghost' onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="login" >
                <Icon type="login" />登陆/注册
            </Menu.Item>

        return(
           <div>
            <header>
                <Row>
               <Col span={2}></Col>
               <Col span={4}>
                   <a href='/' target='_self' className='logo'>
                       <img src={logo} alt="logo"/>
                       <span>ReactNews</span>
                   </a>
               </Col>
               <Col span={16}>
                   <Menu mode='horizontal'
                         selectedKeys={[this.state.current]}
                         onClick={this.handleClick.bind(this)}
                   >
                       <Menu.Item key="top">
                           <Icon type="appstore" />头条
                       </Menu.Item>
                       <Menu.Item key="shehui">
                           <Icon type="appstore" />社会
                       </Menu.Item>
                       <Menu.Item key="guonei">
                           <Icon type="appstore" />国内
                       </Menu.Item>
                       <Menu.Item key="guoji">
                           <Icon type="appstore" />国际
                       </Menu.Item>
                       <Menu.Item key="yule">
                           <Icon type="appstore" />娱乐
                       </Menu.Item>
                       <Menu.Item key="tiyu">
                           <Icon type="appstore" />体育
                       </Menu.Item>
                       <Menu.Item key="keji">
                           <Icon type="appstore" />科技
                       </Menu.Item>
                       <Menu.Item key="shishang">
                           <Icon type="appstore" />时尚
                       </Menu.Item>
                       {userShow}
                   </Menu>
               </Col>
               <Col span={2}></Col>
           </Row>
                <Modal
                    title="用户中心"
                    visible={this.state.modalVisable}
                    onOk={()=>this.setModalVisable(false)}
                    onCancel={()=>this.setModalVisable(false)}
                    okText="确定"
                    cancelText="取消"
                    destroyOnClose='true'
                >
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="登陆" key="1">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem label='帐户'>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入您的帐号' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的帐号" />
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入你的密码' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入你的密码" />
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
                                        rules: [{ required: true, message: '请输入您的帐号' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的帐号" />
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入你的密码' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入你的密码" />
                                    )}
                                </FormItem>
                                <FormItem label='确认密码'>
                                    {getFieldDecorator('repassword', {
                                        rules: [{ required: true, message: '请输入你的确认密码' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入你的确认密码" />
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
            </header>
           </div>
        );
    }

}

export default PCHeader = Form.create()(PCHeader)