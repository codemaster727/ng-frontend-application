import styled from 'styled-components';

export const Button = styled.button`
	width: 93px;
	height: 35px;
	border: 0.6px solid ${(props) => props.theme.colors.gold};
	border-radius: 2.5px;
	background: transparent;
	color: ${(props) => props.theme.colors.white};
	cursor: pointer;
`;
