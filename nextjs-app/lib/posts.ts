import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // /post 파일 이름을 잡아주기
    const fileNames = fs.readdirSync(postsDirectory);
    // ['pre-rendering.md', ...]

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data as { date: string; title: string }
        }
    })

    // Sorting
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

const json: string = '{"x":4,"y":7}'
const coordinates = JSON.parse(json)
console.log(coordinates)

let greeting
greeting = 'hello' // let greeting: any

let num = [-7, -2, 10]
let numAboveZero: boolean | number = false

for (let i = 0; i < num.length; i++) {
    if (num[i] > 0) {
        numAboveZero = num[i]
    }
}