import styled, { DefaultTheme } from 'styled-components';

const Title = styled('div')<{ fontFamily?: string; fontSize?: number; color?: string; py?: number }>`
	font-family: ${(props: any) => props.fontFamily || 'Lato'};
	font-style: normal;
	font-weight: 700;
	font-size: ${(props: any) => props.fontSize || 12}px;
	line-height: 19px;
	text-transform: capitalize;
	color: ${(props: any) => (props.color ? props.theme.colors[props.color] : props.theme.colors.white)};
	margin: ${(props: any) => props.py || 2}px 0;
`;

export default Title;
