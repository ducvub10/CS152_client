import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Comment = ({ comment }) => {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle className='text-lg'>{comment.user_name}</CardTitle>
          <CardDescription className='text-sm'>
            {comment.updated_at || comment.created_at}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='text-sm'>{comment.content}</CardContent>
    </Card>
  );
};

export default Comment;
