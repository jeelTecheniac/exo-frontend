import Typography from "../../lib/components/atoms/Typography";
import Comment from "./Comment";

interface CommentProps {
  initial: string;
  username: string;
  comment: string;
  timestamp: string;
}

interface CommentDataProps {
  data: CommentProps[];
}

const CommentData: React.FC<CommentDataProps> = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Typography
        className=" text-secondary-100 mb-4"
        size="base"
        weight="bold"
      >
        Comments and Remarks
      </Typography>
      {data.map((comment, index) => (
        <Comment
          key={index}
          initial={comment.initial}
          username={comment.username}
          comment={comment.comment}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
};

export default CommentData;
