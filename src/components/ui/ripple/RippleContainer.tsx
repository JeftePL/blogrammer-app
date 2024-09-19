import styled from 'styled-components'

interface RippleContainerProps {
	duration?: number
	color?: string
}

const RippleContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'duration',
})<RippleContainerProps>`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	span {
		transform: scale(0);
		border-radius: 100%;
		position: absolute;
		opacity: 0.75;
		background-color: ${(props) => props.color};
		animation-name: ripple;
		animation-duration: ${(props) => props.duration}ms;
	}

	@keyframes ripple {
		to {
			opacity: 0;
			transform: scale(2);
		}
	}
`

export default RippleContainer