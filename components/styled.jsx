import React from 'react';
import styled from 'styled-components';
import contrast from 'contrast';
import Markdown from './markdown.jsx';

export const DefinitionList = styled.dl`
display: flex;
flex-flow: row wrap;
`;
const DefinitionTitle = styled.dt`
margin-bottom: .5em;
font-weight: bold;
`;
const Definition = styled.dd`
margin: 0;
font-size: .8rem;
`;
const DefinitionWrapper = styled.div`
text-align: center;
width: 50%;
padding: .5rem;
border-bottom: .2rem solid ${({theme}) => theme.main};

&:nth-child(2n + 1) {
	border-right: .1rem solid ${({theme}) => theme.main};
}
&:nth-child(2n) {
	border-left: .1rem solid ${({theme}) => theme.main};
}
`;

export const Def = ({title, children}) => <DefinitionWrapper>
	<DefinitionTitle>{title}</DefinitionTitle>
	<Definition>{children}</Definition>
</DefinitionWrapper>;

const DescriptionBody = styled.div`
font-family: Georgia;
font-size: .9em;
line-height: 1.4;
padding: .5em;

p:first-child {
	margin-top: 0;
}
p:last-child {
	margin-bottom: 0;
}
`;

export const Description = ({text}) => <DescriptionBody>
	<Markdown text={text} />
</DescriptionBody>;

export const Card = styled.article`
display: inline-block;
width: 100%;
border: .4em solid ${({theme}) => theme.main};
border-radius: .4em;
`;

export const Title = styled.h2`
font-family: Georgia;
font-weight: normal;
margin: .2rem 0;
text-align: center;
`;

export const Subtitle = styled.h3`
font-family: Georgia;
margin: 0;
text-align: center;
font-size: .8rem;
padding: .1rem;
color: ${({theme}) => contrast(theme.main) === 'light' ? 'black' : 'white'};

&:before {
	content: '';
	display: block;
	border-top: 1.3rem solid ${({theme}) => theme.main};
	margin: 0rem -2px -1.1rem;
}
`;