import React, {Component} from 'react';
import styled from 'styled-components';

const HiddenInput = styled.input`display: none`;

class Import extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = {
			data: this.stringifyExportData(props),
		};

		this.handleFileInput = this.handleFileInput.bind(this);
		this.triggerFileInput = this.triggerFileInput.bind(this);
	}

	stringifyExportData(props = this.props) {
		return Buffer.from(JSON.stringify(props.exportData, null, 2)).toString('base64');
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			data: this.stringifyExportData(newProps),
		});
	}

	triggerFileInput(ev) {
		ev.preventDefault();
		if(this.input) {
			this.input.click();
		}
	}

	handleFileInput(ev) {
		console.log('here');
		const reader = new FileReader();
		const [file] = ev.target.files;

		reader.addEventListener("load", () => {
			try {
				this.props.onImport(JSON.parse(reader.result));
			} catch(e) {
				alert(`Couldn't parse JSON from ${file.name}`);
			}
		}, false);

		reader.readAsText(file);
	}

	render() {
		return <div>
			<a href='#' onClick={this.triggerFileInput}>
				Import JSON
			</a>
			<HiddenInput innerRef={input => this.input = input} type='file' onChange={this.handleFileInput} accept='.json' />

			<a href={`data:application/json;base64,${this.state.data}`} download>
				Export JSON
			</a>
		</div>;
	}
}

export default Import;
