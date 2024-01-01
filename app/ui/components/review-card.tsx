import Image from 'next/image';
import Link from 'next/link';

interface ReviewCardProps {
  imageSrc: string;
  subHeader: string;
  href: string;
  alt?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  imageSrc,
  subHeader,
  alt = '',
  href,
  ...props
}) => {
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
        />
        <h3 className="px-2 py-4 text-xl font-bold mt-2 md:mt-0 md:py-1 ">{subHeader}</h3>
      </Link>
    </div>
  );
};
