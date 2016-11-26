import React, {Component} from 'react';
import {markdown} from 'markdown';

export default class Markdown extends Component {
	render() {
		return <div dangerouslySetInnerHTML={{__html: markdown.toHTML(this.props.text, 'Maruku')}} />
	}
}