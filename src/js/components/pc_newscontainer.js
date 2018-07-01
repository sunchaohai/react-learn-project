import React, {Component} from 'react';
import {Row, Col, Tabs} from 'antd'
import PCNewsBlock from "./pc_news_block";
import PCNewsImageBlock from "./pc_news_image_block";
import CarouselImg from './carousel_img'
import Product from "./product";

const TabPane = Tabs.TabPane;


class PCNewContainer extends Component {
    render() {

        return (
            <div>
                <Row className="container">
                    <Col span={2}></Col>
                    <Col span={20} className='container'>
                        <div className="leftContainer">
                            <CarouselImg/>
                            <PCNewsImageBlock count={6} cardTitle="国际新闻" type='guoji' width='400px' imageWidth='112px'/>
                        </div>
                        <Tabs defaultActiveKey="1" className='tabs_news'>
                            <TabPane tab="头条新闻" key="1">
                                <PCNewsBlock count={22} cardTitle="头条新闻" type='top' with='100%'/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={22} cardTitle="国际新闻" type='guoji' with='100%'/>
                            </TabPane>
                        </Tabs>
                        <Tabs className="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <Product/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={8} cardTitle="国内新闻" type='guonei' width='100%' imageWidth='112px'/>
                            <PCNewsImageBlock count={16} cardTitle="娱乐新闻" type='yule' width='100%' imageWidth='112px'/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }

}

export default PCNewContainer;