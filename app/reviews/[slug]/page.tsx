import Heading from '@/app/ui/components/heading';
import { getReviewFromCms, getSlugs } from '@/app/lib/actions/actions';
import Image from 'next/image';
import { ShareLinkButton } from '@/app/ui/components/share-link-button';

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({
    params: {
      slug,
    },
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const review = await getReviewFromCms(params.slug);
  return {
    title: review.title,
  };
}

export default async function Review({ params }: { params: { slug: string } }) {
  const data = await getReviewFromCms(params.slug);
  const { image, date, title, body } = data;
  return (
    <>
      <Heading level={1}>{title}</Heading>
      <div className="flex gap-3 items-center py-3">
        <p>{date}</p>
        <ShareLinkButton />
      </div>
      <Image src={image} alt="" width={640} height={480} className="rounded" />
      <article className="prose" dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
