import Link from "next/link";

export default function Home() {
  return (
    <main className='h-screen relative'>
      <div className='absolute inset-0 z-0'>
        <img src='/HomepageBackdrop.jpg' alt='Background' />
      </div>

      <div className='flex flex-col justify-center items-center relative z-10'>
        <div className='text-center pt-16 mt-20'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to SJSU Hub</h1>
          <p className='text-lg text-gray-600 mb-8'>
            The central hub of your SJSU Academic lifestyle.
          </p>
        </div>

        <div className='flex justify-center mb-8'>
          <Link href='/courses?page=1&limit=10'>
            <h2 className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer mr-2'>
              Explore Courses
            </h2>
          </Link>
          <Link href='/professors?page=1&limit=10'>
            <h2 className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer mr-2'>
              View Professors
            </h2>
          </Link>
          <Link href='/schedules?page=1&limit=10'>
            <h2 className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer'>
              View Schedules
            </h2>
          </Link>
        </div>

        <section className='p-4 bg-gray-100 w-full mt-40'>
          <h2 className='text-xl font-semibold mb-2'>About SJSU Hub</h2>
          <p className='text-gray-700'>
            SJSU Hub is the center of attention for all things academics at
            SJSU. Using your SJSU email, sign in and quickly get started on
            elevating your enrollment process. Create and edit your profile and
            begin taking your learning to the next level!
          </p>
          <p className='text-gray-700 mt-3'>
            Share your experiences by leaving reviews for professors, courses,
            and optimal schedules, providing valuable insights for other
            students. Leave comments below reviews and connect with other
            students on their personal experiences with a specific professor or
            course. The viewing experience has been streamlined to showcase the
            deatailed performance of professors and courses.
          </p>
        </section>
      </div>
    </main>
  );
}
