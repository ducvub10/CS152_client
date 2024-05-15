import fetch from "@/utils/fetch";

const fetchCourseDetails = async (course) => {
  const data = await fetch(`/courses/${course}/details`, { cache: "no-store" });

  return data.data;
};

const CourseDetails = async ({ course }) => {
  const data = await fetchCourseDetails(course);
  return (
    <div className='flex flex-col space-y-3'>
      <div>
        <h1 className='text-4xl font-bold'>
          {data.department} {data.course_number}
        </h1>
        <p className='text-sm text-slate-400'>{data.name}</p>
        <p className='text-sm text-slate-400'>{data.units}</p>
      </div>
      <div className='flex flex-col space-y-1'>
        <p>{data.description}</p>
        <p className='text-sm text-slate-400'>{data.prereqs}</p>
        <p className='text-sm text-slate-400'>{data.satisfies_area}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
