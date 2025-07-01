import React from "react";
import Typography from "../atoms/Typography";
import { CameraIcon } from "../../../icons";

interface ProfileHeaderProps {
  name: string;
  email: string;
  imageUrl?: string;
  className?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  imageUrl,
  className = "",
}) => {
  return (
    <div className="relative pt-8 bg-secondary-10">
      <div
        className={`flex items-center gap-4 bg-white rounded-lg px-4 py-6 shadow-light-10 ${className}`}
      >
        <div className="relative w-16 h-16 -mt-[64px] border-2 border-white rounded-full">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-[2px] right-[5px] w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <CameraIcon width={20} height={20} />
          </div>
        </div>
        <div className="flex flex-col">
          <Typography
            size="sm"
            weight="extrabold"
            className="text-secondary-100"
          >
            {name}
          </Typography>
          <Typography size="xs" weight="semibold" className="text-secodary-100">
            {email}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
