import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
console.log(postsDirectory)
export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        //remove .md from file name to get id
        const id = fileName.replace(/\.md$/, '')

        //read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        //combine the data with the id
        return {
            id,
            ...matterResult.data
        }

    })
    //sort posts by data
    return allPostsData.sort((a, b) => {
        if (a.date < b.data) {
            return 1
        } else {
            return -1
        }
    })
}
export function getAllPostIds() {

    //     // Instead of the file system,
    //   // fetch post data from an external API endpoint
    //   const res = await fetch('..')
    //   const posts = await res.json()
    //   return posts.map(post => {
    //     return {
    //       params: {
    //         id: post.id
    //       }
    //     }
    //   })

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    //use gray-matter to post metadata section
    const matterResult = matter(fileContents)

    //use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}