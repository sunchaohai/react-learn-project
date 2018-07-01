import React, { Component } from 'react';
import { Row, Col } from 'antd';

class PCFooter extends Component{

    render(){
        return(
            <div>
                <footer>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            &copy;&nbsp;2018 ReactNews. All Rights Reserved.
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </footer>
            </div>

        );
    }

}

export default PCFooter;