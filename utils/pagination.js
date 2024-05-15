import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

export function getPageRange(route, page, pageEnd, oldParams) {
  const pages = [];
  const start = page - 3 > 0 ? page - 3 : 1;
  const end = page + 3 <= pageEnd ? page + 3 : pageEnd;
  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink
          href={`/${route}?${oldParams}page=${i}`}
          isActive={i === page}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return pages;
}
