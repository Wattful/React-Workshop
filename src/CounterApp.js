import React from "react";
import "./App.css";
	
export class CounterApp extends React.Component {
	render(){
		return (
			<Counter/>
		);
	}
}

class Counter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: "Elephants",
			value: 0,
		}
	}

	onPlusClick = () => {
		this.changeValue(x => x + 1);
	}

	onMinusClick = () => {
		this.changeValue(x => x - 1);
	}

	changeValue = (operation) => {
		const {value} = this.state;
		this.setState({value: operation(value)});
	}

	render(){
		const {name, value} = this.state;
		return (
			<div className="counter">
				<span className="counterName">
					{name}
				</span>
				<span className="counterText">
					{value}
				</span>
				<button type="button" className="counterButton" onClick={this.onPlusClick}>
					+
				</button>
				<button type="button" className="counterButton" onClick={this.onMinusClick}>
					-
				</button>
			</div>
		);
	}
}
