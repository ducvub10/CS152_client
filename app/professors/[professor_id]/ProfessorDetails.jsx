import fetch from "@/utils/fetch";

const fetchProfessorDetails = async (professor_id) => {
  const data = await fetch(`/professors/${professor_id}/details`, {
    cache: "no-store",
  });

  return data.data;
};

const ProfessorDetails = async ({ professor_id }) => {
  const data = await fetchProfessorDetails(professor_id);
  return (
    <div className='flex flex-col space-y-3'>
      <h1 className='text-4xl font-bold'>{data.name}</h1>
      <p className='text-sm text-slate-400'>{data.email}</p>
    </div>
  );
};

export default ProfessorDetails;
