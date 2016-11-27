import React from 'react';
import {Tokenizer} from 'react-typeahead';
import styled from 'styled-components';

import {observe} from '../store';
import {notKeys, getKeys, addUniq, remove} from './obj';

const WrapTokenizer = (props) => <div className={props.className} onClick={props.onClick}>
	<Tokenizer ref={props.tokenizerRef} {...props} />
</div>;

const StyledTokenizer = styled(WrapTokenizer)`
@media print {
	display: none;
}

.typeahead-tokenizer {
	position: relative;
	border: 1px solid #0003;
	border-radius: 3px;
	padding: .2rem;
	cursor: text;
	line-height: 1.4rem;
}

.typeahead-token {
	display: inline-block;
	vertical-align: text-top;
	border-radius: 2px;
	background: #35f;
	color: white;
	line-height: 1.2rem;
	margin-right: .3rem;
	padding-left: .3rem;
	font-size: .8rem;
}

.typeahead-token-close {
	display:inline-block;
	color: white;
	text-decoration: none;
	margin-left: .3rem;
	background: #13c;
	height: 1.2rem;
	width: 1.2rem;
	text-align: center;
	border: 0 none;
	border-bottom-right-radius: 2px;
	border-top-right-radius: 2px;
}

.typeahead {
	display: inline-block;
}

.typeahead input {
	border: 0 none;
	font: inherit;
}

.typeahead-selector {
	position: absolute;
	left: -1px;
	right: -1px;
	background: white;
	max-height: 20em;
	overflow-y: auto;
	margin: 0;
	padding: 0;
	list-style: none;
	border: 1px solid #0003;
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
}

.typeahead-selector li {
	border-bottom: 1px solid #0001;
	&:last-child {
		border: 0 none;
	}
}

.typeahead-option {
	display: block;
	padding: .5em;
	color: inherit;
	border: 0 none;

	&:hover {
		background: #35f1;
	}
}
`;

const SelectorContainer = observe(({data, storeKey, placeholder, onRemove, onAdd}, {subscribe, dispatch}) => {
	let tokenizer;
	return <StyledTokenizer
		onClick={() => tokenizer.focus()}
		options={notKeys(subscribe(storeKey), data)}
		defaultSelected={getKeys(subscribe(storeKey), data)}
		filterOption='name'
		displayOption='name'
		tokenizerRef={el => tokenizer = el}
		placeholder={placeholder}
		onTokenAdd={item => {
			// workaround fmoo/react-typeahead#224
			tokenizer.refs.typeahead.refs.entry.blur();
			tokenizer.refs.typeahead.refs.entry.focus();
			dispatch(storeKey, data => addUniq(data, item.id));

			if(onAdd) {
				onAdd(item);
			}
		}}
		onTokenRemove={item => {
			tokenizer.refs.typeahead.refs.entry.focus();
			dispatch(storeKey, data => remove(data, item.id));

			if(onRemove) {
				onRemove(item);
			}
		}}
	/>;
});

export default SelectorContainer;