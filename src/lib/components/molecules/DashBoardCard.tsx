import { FC } from "react";
import { FileVioletIcon } from "../../../icons";
import Typography from "../atoms/Typography";

interface DashBoardCardProps {
  icon?: React.ReactNode;
  count: number;
  title: string;
  onClick?: () => void;
}

const DashBoardCard: FC<DashBoardCardProps> = ({
  icon = <FileVioletIcon width={44} height={44} />,
  count,
  title,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white rounded-[8px] shadow-light-20 px-4 py-5 flex flex-col gap-5
      hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out
      cursor-pointer hover:bg-gray-50 border border-secondary-30 hover:border-secondary-20"
    >
      <div className="flex gap-5">
        {icon}
        <div>
          <Typography
            size="xl_2"
            weight="extrabold"
            className="text-secondary-100"
          >
            {count?.toLocaleString()}
          </Typography>

          <Typography size="sm" weight="normal" className="text-secondary-60">
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCard;
