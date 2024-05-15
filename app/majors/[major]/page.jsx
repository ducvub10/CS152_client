import fetch from "@/utils/fetch";
import MajorRequirementsList from "./MajorRequirementsList";

const fetchMajorRequirements = async (major_name) => {
  const data = await fetch(`/majors/${major_name}/requirements`, {
    cache: "no-store",
  });

  return data;
};

const MajorRequirements = async ({ params }) => {
  const data = await fetchMajorRequirements(params.major);
  return (
    <div>
      <MajorRequirementsList major_name={params.major} r={data} />
    </div>
  );
};

export default MajorRequirements;
