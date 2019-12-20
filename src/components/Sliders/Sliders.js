import React from 'react';
import { Carousel, Icon } from 'antd';
import './style.scss';

const data = [
	{
		class: 'item item-1',
		title: 'TEACHER FINDER',
		content: 'Website tìm kiếm giáo viên chuyên về lập trình',
	},
	{
		class: 'item item-2',
		title: 'DANH MỤC ĐA DẠNG',
		content: 'C, C++, C#, Web design, Web developer, Moblie Developer,...',
	},
	{
		class: 'item item-3',
		title: 'UY TÍN VÀ CHẤT LƯỢNG',
		content: 'Kiểm tra chất lượng giáo viên. Hoàn tiền nếu không hài lòng',
	},
];

class Sliders extends React.Component {
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.carousel = React.createRef();
	}

    next = () => {
			this.carousel.next();
			console.log("click")
    };

    previous = () => {
    	this.carousel.prev();
    };

    render() {
    	const slidersContent = [];
    	data.forEach((item) => {
    		slidersContent.push(
    			<div className="item">
    				<div className="content-slider">
							<p className="item-title">
								{item.title}
							</p>
							<p className="item-content">
								{item.content}
							</p>
    				</div>
    				<div className="play-icon">
    					<Icon type="left" onClick={this.previous} className="previous" />
    					<Icon type="right" onClick={this.next} className="next" />
    				</div>
						
    			</div>,
    		);
    	});
    	return (
    		<div className="slider">
    			<Carousel autoplay className="sliders" ref={(node) => (this.carousel = node)}>
    				{slidersContent}
    			</Carousel>
    		</div>
    	);
    }
}

export default Sliders;
