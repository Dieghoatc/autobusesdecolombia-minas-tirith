import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";

import { Info } from "@/services/types/vehicle.type";

interface PaginationProps {
  pagination: Info;
  goToPage: (page: number) => void;
}

export function PaginationGallery({ pagination, goToPage }: PaginationProps) {
  return (
    <Pagination className="text-white">
      <PaginationContent>
        {pagination.hasPrev && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(pagination.currentPage - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => goToPage(pagination.currentPage - 1)}
              >
                {pagination.currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink
            onClick={() => goToPage(pagination.currentPage)}
            isActive
          >
            {pagination.currentPage}
          </PaginationLink>
        </PaginationItem>
        {pagination.hasNext && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => goToPage(pagination.currentPage + 1)}
              >
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
                onClick={() => goToPage(pagination.currentPage + 1)}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
