import { Metadata } from 'next';
import Heading from '../ui/components/heading';

import { ReviewCard } from '../ui/components/review-card';
import { getReviews } from '../lib/actions/actions';
export const metadata: Metadata = {
  title: 'Reviews',
};
export default async function Reviews() {
  const reviews = await getReviews();

  return (
    <>
      <Heading level={1}>Reviews</Heading>
      <ul className="flex flex-col gap-4 ">
        {reviews.map(({ title, image, id }) => (
          <li key={title}>
            <ReviewCard href={`/reviews/${id}`} imageSrc={image} subHeader={title} />
          </li>
        ))}
      </ul>
    </>
  );
}
