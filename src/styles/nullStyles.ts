import { createGlobalStyle } from 'styled-components'

const NullStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		border: 0;
	}

	*,
	*:before,
	*:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	:focus,
	:active {
		outline: none;
	}

	a:focus,
	a:active {
		outline: none;
	}

	input,
	button,
	textarea {
		font-family: inherit;
	}

	input::-ms-clear {
		display: none;
	}

	button,
	input[type="button"],
	input[type="submit"],
	input[type="reset"] {
		cursor: pointer;
	}

	button::-moz-focus-inner {
		padding: 0;
		border: 0;
	}

	a,
	a:visited {
		text-decoration: none;
	}

	ul,
	li {
		list-style: none;
	}

	img {
		vertical-align: top;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: inherit;
		font-weight: 400;
	}
`
export default NullStyles
