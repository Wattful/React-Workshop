import React from "react";
import "./App.css";

	
export class CounterApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedCounter: 0,
			counters: [],
		};
	}

	onHeaderClick = (index) => {
		this.setState({selectedCounter: index});
	};

	onPlusClick = (index) => {
		this.changeCounterValue(index, value => value + 1);
	}

	onMinusClick = (index) => {
		this.changeCounterValue(index, value => value - 1);
	}

	changeCounterValue = (index, operation) => {
		const {selectedCounter, counters} = this.state;
		const {name, value} = counters[selectedCounter];
		const newValue = operation(value);
		const newCounters = [...counters];
		newCounters[selectedCounter] = {name, value: newValue};
		this.setState({counters: newCounters});
	}

	onAddCounter = (name) => {
		const {counters} = this.state;
		for(const {name: counterName} of counters){
			if(name === counterName){
				return;
			}
		}
		const newCounters = [...counters];
		newCounters.push({name, value: 0});
		this.setState({counters: newCounters, selectedCounter: newCounters.length - 1});
	}

	onRemoveCounter = (index) => {
		let {selectedCounter, counters} = this.state;
		const newCounters = [...counters];
		newCounters.splice(index, 1);
		if(index < selectedCounter || (selectedCounter !== 0 && selectedCounter === counters.length - 1)){
			selectedCounter--;
		}
		this.setState({selectedCounter, counters: newCounters});
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
					onAddCounter={this.onAddCounter} 
					onRemoveCounter={this.onRemoveCounter}
				/>
				{counters.length > 0 ? 
					(
						<Counter 
							name={name}
							value={value}
							onPlusClick={() => this.onPlusClick(selectedCounter)}
							onMinusClick={() => this.onMinusClick(selectedCounter)}
						/>
					) : (
						<div className="emptyFlex">
							<span className="emptyText">No Counters.</span>
						</div>
					)
				}
			</div>		
		);
	}
}

function Sidebar({counters, selectedCounter, onHeaderClick, onAddCounter, onRemoveCounter}){
	const [text, changeText] = React.useState("");
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
				onRemoveCounter={() => onRemoveCounter(i)} 
			/>
		);
	}
	const addCounter = () => {
		if(!text){
			return;
		}
		onAddCounter(text);
		changeText("");
	}
	const enterPress = (event) => {
		if(event.code === "Enter"){
			addCounter();
		}
	}
	return (
		<div className="sidebar">
			<input 
				className="nameInput"
				type="text"
				placeholder="New Counter Name"
				onKeyDown={enterPress}
				value={text}
				onChange={(event) => changeText(event.target.value)}
			/>
			<button className="addButton" type="button" onClick={addCounter} >
				Add Counter
			</button>
			<span>
				{counterHeaders}
			</span>
			<span className="afterSidebar"/>
		</div>
	);
}

function CounterHeader({name, value, selected, onClick, onRemoveCounter}) {
	const onRemoveClick = (event) => {
		event.stopPropagation();
		onRemoveCounter();
	}
	return (
		<div className={selected ? "selected header" : "header"} onClick={onClick}>
			<span className="headerButtonSpace">
				<button type="button" onClick={onRemoveClick}>-</button> 
			</span>
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
