import React, { Component } from 'react';
import axios from 'axios';

import './NetflixList.css';

export default class NetflixList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mylist: null,
			recommendations: null
		};
	}

	componentDidMount() {
		let url = 'http://localhost:8000';
		axios.get(url)
		.then(res => {
			this.setState({
				mylist: res.data.mylist,
				recommendations: res.data.recommendations,
			})
		})
		.catch(err => console.log(err));
	}

	remove(id) {
		this.setState({
			recommendations: [
				...this.state.recommendations,
				this.state.mylist.filter(ele => ele.id === id)[0]
			],
			mylist: [...this.state.mylist.filter(ele => ele.id !== id)]
		});
	}


	add(id) {
		this.setState({
			mylist: [
				...this.state.mylist,
				this.state.recommendations.filter(ele => ele.id === id)[0]
			],
			recommendations: [...this.state.recommendations.filter(ele => ele.id !== id)]
		});
	}

	renderItem(listData, remove, title, showTitleOnly = false) {
		if (showTitleOnly) {
			debugger
			const titles = listData.map(ele => ele.title);
			return (
				<div>
					<h3> {title} </h3>
					{
						titles.map(ele => {
							return (
								<div>
									<h4 key={ele}>{ele}</h4>
									<br />
								</div>
							);
						})
					}
				</div>
			);
		}

		return (
			<div>
				<h3> {title} </h3>
				<ul>
					{listData.map(ele => {
						return (
							<li key={ele.id} className='item-li'>
				        <div className='item-img'>
				          <div className='item-title'>
				            {ele.title}
				          </div>
				          <img src={ele.img} />

				          <div className='item-btn'>
				            {
				              remove ?
				              <button onClick={this.remove.bind(this, ele.id)}>Delete</button> :
				              <button onClick={this.add.bind(this, ele.id)}>Add</button>
				            }
				          </div>
				        </div>
				      </li>
						);
					})}
				</ul>
			</div>
		);
	}

	render() {
		if (!this.state.mylist || !this.state.recommendations) {
			return <div> Loading </div>;
		}
		const { mylist, recommendations } = this.state;
		return (
			<div className='container'>
				{this.renderItem(mylist, true, 'My List')}
				{this.renderItem(recommendations, false, 'Recommendations')}
				{this.renderItem(mylist, true, 'Titles of My List', true)}
			</div>
		);
	}
}
