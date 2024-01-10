import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { clsx } from 'clsx';

export const PaginationBar = ({
  pageCount,
  currentPageNumber,
  href,
}: {
  pageCount: number;
  currentPageNumber: number;
  href: string;
}) => {
  const disableFirst = currentPageNumber === 1;
  const disableLast = currentPageNumber === pageCount;
  return (
    <Pagination className="my-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={clsx(disableFirst && 'pointer-events-none opacity-50')}
            href={`${href}?page=${
              currentPageNumber - 1 <= 0 ? 1 : currentPageNumber - 1
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`reviews`}>
            Page {currentPageNumber} of {pageCount}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={clsx(disableLast && 'pointer-events-none opacity-50')}>
          <PaginationNext
            href={`${href}?page=${
              currentPageNumber + 1 > pageCount ? pageCount : currentPageNumber + 1
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
