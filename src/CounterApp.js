import React from "react";
import "./App.css";
	
export class CounterApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedCounter: 0,
			counters: [
				{name: "Elephants", value: 0},
				{name: "Apples", value: 0},
				{name: "Oranges", value: 0},
			],
		};
	}

	onHeaderClick = (index) => {
		this.setState({selectedCounter: index});
	};

	onPlusClick = () => {
		this.changeCounterValue(value => value + 1);
	}

	onMinusClick = () => {
		this.changeCounterValue(value => value - 1);
	}

	changeCounterValue = (operation) => {
		const {selectedCounter, counters} = this.state;
		const {name, value} = counters[selectedCounter];
		const newValue = operation(value);
		const newCounters = [...counters];
		newCounters[selectedCounter] = {name, value: newValue};
		this.setState({counters: newCounters});
	}

	render(){
		const {counters, selectedCounter} = this.state;
		const {name, value} = counters[selectedCounter] || {};
		return(
			<div className="topFlex">
				<Sidebar 
					counters={counters} 
					selectedCounter={selectedCounter} 
					onHeaderClick={this.onHeaderClick} 
				/>
				<Counter 
					name={name}
					value={value}
					onPlusClick={() => this.onPlusClick(selectedCounter)}
					onMinusClick={() => this.onMinusClick(selectedCounter)}
				/>
			</div>		
		);
	}
}

function Sidebar({counters, selectedCounter, onHeaderClick}){
	const counterHeaders = [];
	for(let i = 0; i < counters.length; i++){
		const {name, value} = counters[i];
		const selected = i === selectedCounter;
		counterHeaders.push(
			<CounterHeader
				key={name}
				name={name} 
				value={value} 
				selected={selected} 
				onClick={() => onHeaderClick(i)} 
			/>
		);
	}
	return (
		<div className="sidebar">
			<span>
				{counterHeaders}
			</span>
			<span className="afterSidebar"/>
		</div>
	);
}

function CounterHeader({name, value, selected, onClick}) {
	return (
		<div className={selected ? "selected header" : "header"} onClick={onClick}>
			<span/>
			<span className="headerText">
				{`${name}: ${value}`}
			</span>
		</div>
	);
}

function Counter({name, value, onPlusClick, onMinusClick}){
	return (
		<div className="counter">
			<span className="counterName">
				{name}
			</span>
			<span className="counterText">
				{value}
			</span>
			<button type="button" className="counterButton" onClick={onPlusClick}>
				+
			</button>
			<button type="button" className="counterButton" onClick={onMinusClick}>
				-
			</button>
		</div>
	);
}
