import { Metadata } from 'next';
import Heading from '../ui/components/heading';

import { ReviewCard } from '../ui/components/review-card';
import { getAllReviewsFromCms } from '../lib/actions/actions';
export const metadata: Metadata = {
  title: 'Reviews',
};
export default async function Reviews() {
  const reviews = await getAllReviewsFromCms();
  return (
    <>
      <Heading level={1}>Reviews</Heading>
      <ul className="flex flex-col gap-4 ">
        {reviews.map(({ date, image, slug, title, subtitle }, index) => (
          <li key={title}>
            <ReviewCard
              priority={index === 0}
              href={`/reviews/${slug}`}
              imageSrc={image}
              subHeader={title}
              subtitle={subtitle}
              date={date}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
