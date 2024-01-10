import { Metadata } from 'next';
import Heading from '../ui/components/heading';

import { ReviewCard } from '../ui/components/review-card';
import { getAllReviewsFromCms } from '../lib/actions/actions';
import { PaginationBar } from '../ui/components/pagination';
import { Combobox } from '@/components/ui/combobox';
export const metadata: Metadata = {
  title: 'Reviews',
};

const parsePageNumber = (page: string) => {
  const parsedPage = parseInt(page, 10);
  if (isNaN(parsedPage) || parsedPage <= 1) {
    return 1;
  }

  return parsedPage;
};
export default async function Reviews({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { reviews, pageCount } = await getAllReviewsFromCms(+searchParams?.page || 1);
  const page = parsePageNumber(searchParams?.page);

  return (
    <>
      <Heading level={1}>Reviews</Heading>
      <div className="flex justify-between">
        <PaginationBar pageCount={pageCount} currentPageNumber={page} href="/reviews" />
        <Combobox
          items={reviews.map(({ slug, title }) => ({ value: slug, label: title }))}
        />
      </div>
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
