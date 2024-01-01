import Heading from '@/app/ui/components/heading';
import { getReview, getSlugs } from '@/app/lib/actions/actions';
import Image from 'next/image';
import { ShareLinkButton } from '@/app/ui/components/share-link-button';

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const review = await getReview(params.id);
  return {
    title: review.title,
  };
}

export default async function Review({ params }: { params: { id: string } }) {
  const { date, image, sanitizedHtml, title } = await getReview(params.id);
  return (
    <>
      <Heading level={1}>{title}</Heading>
      <div className="flex gap-3 items-center py-3">
        <p>{date}</p>
        <ShareLinkButton />
      </div>
      <Image src={image} alt="" width={640} height={480} className="rounded" />
      <article dangerouslySetInnerHTML={{ __html: sanitizedHtml }} className="prose" />
    </>
  );
}
