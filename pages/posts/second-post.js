import Link from "next/link"
import Head from "next/head"
import Layout from "../components/layout"
export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>This is the second post</title>
            </Head>
            <div>
                <h1>Second post</h1>
                <h3>In Next JS on a different branch called branch2</h3>
                <h5>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>


                </h5>
                <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
            </div>
        </Layout>

    )
}
