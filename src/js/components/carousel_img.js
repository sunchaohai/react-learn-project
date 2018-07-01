import React, {Component} from 'react';
import {Carousel} from 'antd'
import carousel_1 from '../../imgs/carousel_1.jpg'
import carousel_2 from '../../imgs/carousel_2.jpg'
import carousel_3 from '../../imgs/carousel_3.jpg'
import carousel_4 from '../../imgs/carousel_4.jpg'


class CarouselImg extends Component {
    render(){
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        }
        return(
            <div className="carousel">
                <Carousel afterChange={this.onChange} {...settings}>
                    <div><img src={carousel_1} alt="carousel_1"/></div>
                    <div><img src={carousel_2} alt="carousel_2"/></div>
                    <div><img src={carousel_3} alt="carousel_3"/></div>
                    <div><img src={carousel_4} alt="carousel_4"/></div>
                </Carousel>
            </div>
        );
    }
}

export default CarouselImg

