import { marked } from 'marked';
import { readFile, readdir } from 'node:fs/promises';
import sanitizeHtml from 'sanitize-html';
import matter from 'gray-matter';

export async function getReview(id: string) {
  const data = await readFile(`${process.cwd()}/app/content/reviews/${id}.md`, 'utf-8');
  const {
    content,
    data: { image, date, title, body },
  } = matter(data);
  const html = await marked(content);
  const sanitizedHtml = sanitizeHtml(html);
  return { image, date, title, sanitizedHtml, id };
}

export async function getReviewFilenames() {
  const list = await readdir(`${process.cwd()}/app/content/reviews`);
  const filteredFiles = list.filter((file) => file.endsWith('.md'));
  return filteredFiles.map((filename) => filename.replace('.md', ''));
}

export async function getReviews() {
  const filenames = await getReviewFilenames();
  const reviews = await Promise.all(filenames.map(getReview));
  return reviews;
}

export async function getSlugs() {
  const filenames = await getReviewFilenames();
  return filenames.map((filename) => ({ params: { id: filename } }));
}
