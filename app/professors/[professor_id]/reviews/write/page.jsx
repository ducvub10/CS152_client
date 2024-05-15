import ReviewForm from "@/components/ReviewForm";
import fetch from "@/utils/fetch";

const fetchDepartments = async (projection) => {
  const data = await fetch(`/departments?projection=${projection}`);

  return data.data;
};

const fetchProfessor = async (id) => {
  const data = await fetch(`/professors/${id}`);

  return data.professor_data;
};

const CourseReviewForm = async ({ params }) => {
  const departments = await fetchDepartments("abbr_dept");
  const professor_data = await fetchProfessor(params.professor_id);

  return (
    <div className='space-y-5'>
      <h1>Review {professor_data.name}</h1>
      <ReviewForm departments={departments} defaultProfessor={professor_data} />
    </div>
  );
};

export default CourseReviewForm;
