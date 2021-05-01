import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'
import { Exercise, Note } from '../components/UIComponents'
import { Image, AspectImage, Embed } from 'theme-ui'

const DocsTemplate = ({ data }) => {
	const { mdx } = data
	const shortcodes = { Image, AspectImage, Embed, Exercise, Note }

	return (
		<Layout>
			<Heading>{mdx.frontmatter.title}</Heading>
			<MDXProvider components={shortcodes}>
				<MDXRenderer>{mdx.body}</MDXRenderer>
			</MDXProvider>
		</Layout>
	)
}

const Heading = styled.h1`
	padding-top: 0;
	margin-top: 0;
	&::before {
		display: none !important;
	}
`

export const pageQuery = graphql`
	query($id: String!) {
		mdx(fields: { id: { eq: $id } }) {
			body
			frontmatter {
				title
			}
		}
	}
`
DocsTemplate.propTypes = {
	data: PropTypes.shape({
		mdx: PropTypes.object.isRequired,
	}).isRequired,
}

export default DocsTemplate
