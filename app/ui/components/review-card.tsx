import Image from 'next/image';
import Link from 'next/link';
import Heading from './heading';

interface ReviewCardProps {
  imageSrc: string;
  subHeader: string;
  href: string;
  date: string;
  subtitle: string;
  priority?: boolean;
  alt?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  imageSrc,
  subHeader,
  alt = '',
  priority = false,
  href,
  date,
  subtitle,
  ...props
}) => {
  const formattedDate = `${new Date(date).getUTCFullYear()}/${new Date(
    date,
  ).getUTCMonth()}/${new Date(date).getUTCDate()}`;
  return (
    <div
      className="card bg-white rounded-lg shadow-sm border-solid border border-slate-400 hover:shadow-xl transition-shadow duration-200 "
      {...props}
    >
      <Link href={href} className="flex flex-col md:flex-row md:items-start md:">
        <Image
          src={imageSrc}
          alt={alt}
          className="rounded-t w-full md:w-1/2 sm:rounded-l sm:rounded-r-none"
          width={640}
          height={320}
          priority={priority}
        />
        <div className="flex flex-col md:justify-center align-middle">
          <Heading
            level={4}
            className="px-2 py-4 text-xl font-bold mt-2 md:mt-0 md:py-1 "
          >
            {subHeader}
          </Heading>
          <p className="px-2">{subtitle}</p>
          <p className="px-2 py-2 text-sm">Published: {formattedDate}</p>
        </div>
      </Link>
    </div>
  );
};
