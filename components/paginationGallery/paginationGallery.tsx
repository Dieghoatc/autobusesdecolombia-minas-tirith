import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Info } from "@/services/types/vehicle.type";

interface PaginationProps {
  pagination: Info;
  goToPage: (page: number) => void;
}

export function PaginationGallery({ pagination, goToPage }: PaginationProps) {

  return (
    <Pagination>
      <PaginationContent>
        {pagination.hasPrev && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href={pagination.prev}
                onClick={() => goToPage(pagination.currentPage - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${pagination.currentPage - 1}`}>
                {pagination.currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href={`?page=${pagination.currentPage}`} isActive>
            {pagination.currentPage}
          </PaginationLink>
        </PaginationItem>
        {pagination.hasNext && (
          <>
            <PaginationItem>
              <PaginationLink href={`?page=${pagination.currentPage + 1}`}>
                {pagination.currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <div onClick={() => goToPage(pagination.pages)}>
                <PaginationEllipsis />
              </div>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={pagination.next}
                onClick={() => goToPage(pagination.currentPage + 1)}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
