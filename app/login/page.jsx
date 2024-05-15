import GoogleAuthButton from "./GoogleAuthButton";

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-10 mt-64'>
      <div className='space-y-3 text-center'>
        <h1 className='font-bold text-2xl'>Create Account or Login</h1>
        <p className='text-slate-400 text-sm'>SJSU email required</p>
      </div>
      <GoogleAuthButton />
    </div>
  );
};

export default Login;
