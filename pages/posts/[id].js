import Layout from '../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../components/date'
import utilStyles from '../../styles/utils.module.css'
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
export async function getStaticPaths() {
    //If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    //     If fallback is true, then the behavior of getStaticProps changes:

    // The paths returned from getStaticPaths will be rendered to HTML at build time.
    // The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
    // In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

    // Catch-all Routes
    // Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

    // pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
    // If you do this, in getStaticPaths, you must return an array as the value of the id key like so:

    // return [
    //   {
    //     params: {
    //       // Statically Generates /posts/a/b/c
    //       id: ['a', 'b', 'c']
    //     }
    //   }
    //   //...
    // ]
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}