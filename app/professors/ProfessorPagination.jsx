import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { recreateParams } from "@/utils/searchparams";
import { getPageRange } from "@/utils/pagination";

const ProfessorPagination = ({ searchParams, pagination }) => {
  const oldParams = recreateParams(searchParams, ["page"]);
  const page = parseInt(searchParams.page);
  const pages = getPageRange("professors", page, pagination.end, oldParams);

  return (
    <Pagination>
      <PaginationContent>
        {pagination.start !== pagination.end && (
          <PaginationItem>
            <PaginationLink
              href={`/professors?${oldParams}page=${pagination.start}`}
            >
              First
            </PaginationLink>
          </PaginationItem>
        )}
        {pages}
        {pagination.start !== pagination.end && (
          <PaginationItem>
            <PaginationLink
              href={`/professors?${oldParams}page=${pagination.end}`}
            >
              End
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ProfessorPagination;
