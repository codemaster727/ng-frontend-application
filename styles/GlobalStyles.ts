import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
//========================================================================================================
// GENERAL
//========================================================================================================
* {
	box-sizing: border-box;
}
*::before {
	box-sizing: border-box;
}
*::after {
	box-sizing: border-box;
}

body {
  background-color: ${({ theme }) => theme.colors.black};
}

* {
	text-decoration: none !important;
}

.center {
	text-align: center;
}

.text-overflow {
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Limit to 3 lines of text */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scrollbar {
	scrollbar-color: ${({ theme }) => theme.colors.gold} ${({ theme }) => theme.colors.black};
	scrollbar-width: thin;
	scrollbar-border-radius: 20px;       /* roundness of the scroll thumb */
}

.scrollbar::-webkit-scrollbar {
	width: 4px;
	background-color: ${({ theme }) => theme.colors.black};    /* color of the scroll thumb */
}

.scrollbar::-webkit-scrollbar-thumb {
	width: thin;
	background: ${({ theme }) => theme.colors.gold};        /* color of the tracking area */
	border-radius: 20px;       /* roundness of the scroll thumb */
}

`;

export default GlobalStyle;
