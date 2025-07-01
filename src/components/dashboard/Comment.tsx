import Typography from "../../lib/components/atoms/Typography";

interface CommentProps {
  initial: string;
  username: string;
  comment: string;
  timestamp: string;
}

const Comment: React.FC<CommentProps> = ({
  initial,
  username,
  comment,
  timestamp,
}) => {
  return (
    <div className="flex items-start space-x-4 py-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-[#748DB9] rounded-full flex items-center justify-center text-white font-semibold border-2 border-secondary-50">
          {initial}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <Typography
            size="sm"
            weight="semibold"
            className="text-secondary-100"
          >
            {username}
          </Typography>
          <Typography
            element="span"
            size="xs"
            weight="normal"
            className="text-secondary-50"
          >
            {timestamp}
          </Typography>
        </div>
        <Typography
          size="xs"
          weight="normal"
          className="text-secondary-50 mt-1"
        >
          {comment}
        </Typography>
      </div>
    </div>
  );
};

export default Comment;
