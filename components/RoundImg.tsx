import styled from 'styled-components';

const RoundImg = styled.div<{ src: string; width?: number; height?: number }>`
	border-radius: 7px;
	background-image: url(${(props) => props.src});
	background-repeat: no-repeat;
	background-size: cover;
	width: ${(props) => props.width || 320}px;
	height: ${(props) => props.height || 106.11}px;
	margin: 6px;
	@media (max-width: 442px) {
		width: 100%;
	}
`;

export default RoundImg;
