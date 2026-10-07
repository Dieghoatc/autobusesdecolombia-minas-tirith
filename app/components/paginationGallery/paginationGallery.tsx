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
  basePath?: string;
}

export function PaginationGallery({ pagination, basePath = "?" }: PaginationProps) {
  const getHref = (page: number) => `${basePath}${basePath.includes('?') ? '&' : '?'}page=${page}`;

  return (
    <Pagination className="text-white">
      <PaginationContent>
        {pagination.hasPrev && (
          <>
            <PaginationItem>
              <PaginationPrevious href={getHref(pagination.currentPage - 1)} scroll={false} />
            </PaginationItem>
            {pagination.currentPage > 2 && (
              <PaginationItem>
                <PaginationLink href={getHref(1)} scroll={false}>1</PaginationLink>
              </PaginationItem>
            )}
            {pagination.currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={getHref(pagination.currentPage - 1)} scroll={false}>
                {pagination.currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href={getHref(pagination.currentPage)} isActive scroll={false}>
            {pagination.currentPage}
          </PaginationLink>
        </PaginationItem>
        {pagination.hasNext && (
          <>
            <PaginationItem>
              <PaginationLink href={getHref(pagination.currentPage + 1)} scroll={false}>
                {pagination.currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            {pagination.currentPage < pagination.pages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pagination.currentPage < pagination.pages - 1 && (
              <PaginationItem>
                <PaginationLink href={getHref(pagination.pages)} scroll={false}>
                  {pagination.pages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href={getHref(pagination.currentPage + 1)} scroll={false} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
