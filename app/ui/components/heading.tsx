import clsx from 'clsx';
import React from 'react';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};
type HeadingTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;

const textSizeMapping = {
  1: 'text-3xl',
  2: 'text-2xl',
  3: 'text-xl',
  4: 'text-lg',
  5: 'text-base',
  6: 'text-sm',
};

const Heading: React.FC<HeadingProps> = ({ level, children, className, ...props }) => {
  const HeadingTag: HeadingTag = `h${level}` as HeadingTag;
  const headingClass = clsx(
    `heading-${level}`,
    textSizeMapping[level],
    'font-semibold	 pb-3',
    className,
  );
  return (
    <HeadingTag className={headingClass} {...props}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
