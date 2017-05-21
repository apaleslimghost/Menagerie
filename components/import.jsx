import React, {Component} from 'react';

class Import extends Component {
	constructor(props, ...args) {
		super(props, ...args);

		this.state = {
			data: this.stringifyExportData(props),
		};
	}

	stringifyExportData(props = this.props) {
		return Buffer.from(JSON.stringify(props.exportData, null, 2)).toString('base64');
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			data: this.stringifyExportData(newProps),
		});
	}

	render() {
		return <div>
			<a href='#' />

			<a href={`data:application/json;base64,${this.state.data}`} download>
				Export JSON
			</a>
		</div>;
	}
}

export default Import;
