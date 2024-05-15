import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const ClientError = ({ searchParams }) => {
  const code = searchParams.code;
  return (
    <div className='flex flex-col space-y-4 items-center'>
      <CardTitle>{code}</CardTitle>
      <CardContent className='text-sm text-slate-400'>Server Error</CardContent>
    </div>
  );
};

export default ClientError;
