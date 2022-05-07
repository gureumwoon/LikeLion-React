import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { getAllPostIds, getSortedPostsData } from '../../lib/posts'

const post = () => {
    return (
        <div></div>
    )
}

export default post

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    // [{params:{id:'pre-rendering'}.{params}}]
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string)
}
