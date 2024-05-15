import ProfessorDetails from "./ProfessorDetails";
import ProfessorStats from "./ProfessorStats";
import ProfessorReviews from "./ProfessorReviews";
import { Separator } from "@/components/ui/separator";

const Course = async ({ params }) => {
  return (
    <div className='flex flex-col space-y-5'>
      <ProfessorDetails professor_id={params.professor_id} />
      <ProfessorStats professor_id={params.professor_id} />
      <Separator />
      <ProfessorReviews professor_id={params.professor_id} />
    </div>
  );
};

export default Course;
