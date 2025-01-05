import { useAuthors } from '@/hooks/useAuthor'
import usePosts from '@/hooks/usePosts'
import useTags from '@/hooks/useTags'
import { useTheme } from '@/hooks/useTheme'
import BaseComponent from '@/theme/BaseComponent'
import { useState } from 'react'
import Box from './Box'
import Icon from './icon/Icon'
import Link from './Link'
import Text from './Text'

type SearchFieldProps = {
	name: string
	id: string
	placeholder?: string
	value?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchField({ ...props }: SearchFieldProps) {
	const [search, setSearch] = useState('')

	const theme = useTheme()
	const posts = usePosts({ search })
	const tags = useTags(search)
	const authors = useAuthors(search)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const handleLinkClick = () => {
		setSearch('')
	}

	return (
		<Box styleSheet={{ position: 'relative', width: '42%' }}>
			<Box
				styleSheet={{
					position: 'relative',
					justifyContent: 'center',
					width: '100%',
					color: theme.colors.neutral.x400,
				}}
			>
				<BaseComponent
					as='input'
					type='search'
					placeholder='Search...'
					value={search}
					onChange={handleSearch}
					{...props}
					styleSheet={{
						backgroundColor: theme.colors.neutral.x100,
						border: 'none',
						borderRadius: '8px',
						padding: '12px',
						outline: 'none',
					}}
				/>
				<Icon
					name='search'
					styleSheet={{
						position: 'absolute',
						right: '10px',
						top: '8px',
						fill: 'none',
						stroke: 'currentColor',
						strokeWidth: 2,
						strokeLinecap: 'round',
						strokeLinejoin: 'round',
					}}
				/>
			</Box>
			{search && (
				<Box styleSheet={{ position: 'absolute', top: '100%', left: '0', width: '100%' }}>
					<Box
						styleSheet={{
							gap: 16,
							backgroundColor: theme.colors.neutral.x000,
							boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1);',
							border: 'none',
							borderRadius: '8px',
							padding: '12px',
							overflowY: 'auto',
							maxHeight: '90vh',
							scrollbarWidth: 'thin',
							scrollbarColor: `${theme.colors.neutral.x100} transparent`,
						}}
					>
						<Box>
							<Text styleSheet={{ fontWeight: 'bold' }}>Posts</Text>
							{posts.map((post) => (
								<Box key={post.metadata.id} onClick={handleLinkClick}>
									<Link href={`/post/${post.metadata.id}`}>{post.title}</Link>
								</Box>
							))}
						</Box>
						<Box>
							<Text styleSheet={{ fontWeight: 'bold' }}>Topics</Text>
							{tags.map((tag) => (
								<Box key={tag} onClick={handleLinkClick}>
									<Link href={`/?tags=${tag}`}>{tag}</Link>
								</Box>
							))}
						</Box>
						<Box>
							<Text styleSheet={{ fontWeight: 'bold' }}>Authors</Text>
							{authors.map((author) => (
								<Box key={author.id} onClick={handleLinkClick}>
									<Link href={`/author/${author.id}`}>{author.name}</Link>
								</Box>
							))}
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	)
}
