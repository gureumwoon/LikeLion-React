import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { getSortedPostsData } from '../lib/posts'
import homeStyles from '../styles/Home.module.css'

const Home = ({ allPostsData }: {
  allPostsData: {
    date: String
    title: String
    id: String
  }[]
}) => {
  return (
    <div>
      <Head>
        <title>Chae Woon</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Woony Introduction]</p>
        <p>
          (This is a website)
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>

        </ul>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
