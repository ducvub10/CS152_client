import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const client_errors = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
};
const ClientError = ({ searchParams }) => {
  const code = searchParams.code;
  return (
    <div className='flex flex-col space-y-4 items-center'>
      <CardTitle>{code}</CardTitle>
      <CardContent className='text-sm text-slate-400'>
        {client_errors[code] || "Client Error"}
      </CardContent>
    </div>
  );
};

export default ClientError;
