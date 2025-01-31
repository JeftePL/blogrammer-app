import BaseComponent from '@/theme/BaseComponent'
import { StyleSheet } from '@/theme/Stylesheet'
import { ComponentProps } from 'react'
import * as icons from './svgs'

const iconSizes = {
	xs: '12px',
	sm: '16px',
	md: '24px',
	lg: '32px',
	xl: '36px',
} as const

type IconProps = {
	name: keyof typeof icons
	styleSheet?: StyleSheet
	size?: keyof typeof iconSizes
	onClick?: () => void
} & ComponentProps<'svg'>

export default function Icon({ name, styleSheet, size = 'md', onClick }: IconProps) {
	const CurrentIcon = icons[name]

	return (
		<BaseComponent
			as='svg'
			styleSheet={{
				width: iconSizes[size],
				height: iconSizes[size],
				color: 'inherit',
				fill: 'currentColor',
				...styleSheet,
			}}
			onClick={onClick}
		>
			<CurrentIcon />
		</BaseComponent>
	)
}
