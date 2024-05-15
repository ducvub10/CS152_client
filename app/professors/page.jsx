import ProfessorTable from "./ProfessorTable";
import ProfessorPagination from "./ProfessorPagination";
import ProfessorFilter from "./ProfessorFilter";
import fetch from "@/utils/fetch";

const fetchProfessors = async (page, limit, name, projection) => {
  const data = await fetch(
    `/professors?page=${page}&limit=${limit}&name=${name}&projection=${projection}`,
    {
      cache: "no-store",
    }
  );

  return data;
};

const Professors = async ({ searchParams }) => {
  const data = await fetchProfessors(
    searchParams.page,
    searchParams.limit,
    searchParams.name || "",
    "*"
  );
  return (
    <div className='flex flex-col space-y-5'>
      <h1>Professors</h1>
      <ProfessorFilter
        name={searchParams.name || ""}
        limit={searchParams.limit}
      />
      <ProfessorTable professors={data.data} />
      {data.pagination && (
        <ProfessorPagination
          searchParams={searchParams}
          pagination={data.pagination}
        />
      )}
    </div>
  );
};

export default Professors;
