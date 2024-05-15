import fetch from "@/utils/fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Repeat2, ClipboardList, Activity, Award, PenLine } from "lucide-react";

const fetchCourseStats = async (course) => {
  const data = await fetch(`/courses/${course}/stats`, { cache: "no-store" });

  return data.stats;
};

const CourseStats = async ({ course }) => {
  const data = await fetchCourseStats(course);
  return (
    <div className='flex space-x-5'>
      <Card className='flex space-x-5  items-center p-5 '>
        <ClipboardList />
        <CardContent className='p-0'>
          <h3 className='text-2xl font-semibold '>{data.avg_grade || "N/A"}</h3>
          <p className='text-xs text-slate-400'>Average Grade</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5 '>
        <Repeat2 />
        <CardContent className='p-0'>
          <h3 className='text-2xl font-semibold '>
            {data.take_again_percent
              ? Math.round(data.take_again_percent * 10) / 10
              : "N/A"}
            %
          </h3>
          <p className='text-xs text-slate-400'>Woud Take Again</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5 '>
        <Activity />
        <CardContent className='p-0'>
          <h3 className='text-2xl font-semibold '>
            {data.avg_difficulty
              ? Math.round(data.avg_difficulty * 10) / 10
              : "N/A"}
          </h3>
          <p className='text-xs text-slate-400'>Average Difficulty</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5 '>
        <Award />
        <CardContent className='p-0'>
          <h3 className='text-2xl font-semibold '>
            {data.avg_quality ? Math.round(data.avg_quality * 10) / 10 : "N/A"}
          </h3>
          <p className='text-xs text-slate-400'>Average Quality</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5 '>
        <PenLine />
        <CardContent className='p-0'>
          <h3 className='text-2xl font-semibold '>{data.total_reviews}</h3>
          <p className='text-xs text-slate-400'>Total Reviews</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseStats;
