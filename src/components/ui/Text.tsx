'use client'

import { useTheme } from '@/hooks/useTheme'
import BaseComponent from '@/theme/BaseComponent'
import { ThemeTypographyVariants } from '@/types/Theme'
import { StyleSheet } from '@skynexui/responsive_stylesheet'
import React from 'react'

type Text = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Action = 'a' | 'button'
type Element = 'li' | 'span'
type Tag = Text | Action | Element

type TextProps = {
	variant?: ThemeTypographyVariants
	tag?: Tag
	children?: React.ReactNode
	styleSheet?: StyleSheet
	href?: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(
	({ tag = 'p', variant = 'body2', styleSheet, ...props }, ref) => {
		const theme = useTheme()
		const textVariant = theme.typography.variants[variant]

		return (
			<BaseComponent
				as={tag}
				styleSheet={{
					...textVariant,
					...styleSheet,
				}}
				ref={ref}
				{...props}
			/>
		)
	},
)

Text.displayName = 'Text'
export default Text