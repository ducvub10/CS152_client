import fetch from "@/utils/fetch";
import MajorList from "./MajorList";

const fetchMajors = async () => {
  const data = await fetch(`/majors`, { cache: "no-store" });

  return data;
};

const Majors = async () => {
  const data = await fetchMajors();
  return (
    <div>
      <MajorList m={data} />
    </div>
  );
};

export default Majors;
