import { marked } from 'marked';
import { readFile, readdir } from 'node:fs/promises';
import sanitizeHtml from 'sanitize-html';
import matter from 'gray-matter';
import qs from 'qs';

export interface Review {
  id: string;
  attributes: {
    slug: string;
    title: string;
    subtitle: string;
    publishedAt: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    body: string;
  };
}
export interface ReviewResponse {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body: string;
}

export interface FullReview extends Review {
  body: string;
}

interface ReviewFetchParams {
  fields: string[];
  populate: { image: { fields: string[] } } | { image: { fields: string[] } };
  sort?: string[];
  pagination: { pageSize: number; withCount: boolean } | { pageSize: number };
  filters?: { slug: { $eq: string } };
}
// Functions to get reviews from local files
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

// Functions to get reviews from Strapi CMS

const baseUrl = 'http://localhost:1337';

export async function fetchReviews(
  params: Partial<ReviewFetchParams>,
): Promise<Review[]> {
  const url = `${baseUrl}/api/reviews?${qs.stringify(params, {
    encodeValuesOnly: true,
  })}`;

  const res = await fetch(url, { next: { tags: ['review'] } });
  if (!res.ok) {
    throw new Error(`Failed to fetch Reviews from CMS: ${res?.statusText}`);
  }
  const { data } = await res.json();
  return data;
}

export async function getSlugs() {
  const data = await fetchReviews({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  });
  return data.map((review: Review) => review.attributes.slug);
}

function mapDataToReview(data: Review[]): ReviewResponse[] {
  return data.map((review: Review) => ({
    id: review.id,
    slug: review.attributes.slug,
    title: review.attributes.title,
    date: review.attributes.publishedAt,
    image: `${baseUrl}${review.attributes.image.data.attributes.url}`,
    body: review.attributes.body,
    subtitle: review.attributes.subtitle,
  }));
}

export async function getAllReviewsFromCms(): Promise<ReviewResponse[]> {
  const data = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 6 },
  });
  return mapDataToReview(data);
}

export async function getReviewFromCms(
  id: string,
  options?: {
    next?: { tags: string[] };
  },
): Promise<ReviewResponse> {
  const data = await fetchReviews({
    filters: { slug: { $eq: id } },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 1, withCount: false },
  });

  return {
    ...mapDataToReview(data)[0],
    body: await marked(data[0].attributes.body),
  };
}
