import React, { useRef } from "react";
import Typography from "../atoms/Typography";
import { CameraIcon } from "../../../icons";
import Avatar from "../../../components/common/Avatar";

interface ProfileHeaderProps {
  name: { firstName: string; lastName: string };
  email: string;
  imageUrl?: string;
  className?: string;
  fullName: string;
  onImageUpload?: (file: File) => void;
  isUploading?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  fullName,
  email,
  imageUrl,
  className = "",
  onImageUpload,
  isUploading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (onImageUpload) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
    // Reset the input value to allow selecting the same file again
    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <div className="relative pt-8 bg-secondary-10">
      <div
        className={`flex items-center gap-4 bg-white rounded-lg px-4 py-6 shadow-light-10 ${className}`}
      >
        <div className="relative w-16 h-16 -mt-[64px] border-2 border-white rounded-full">
          <Avatar
            firstName={name.firstName}
            lastName={name.lastName}
            imageUrl={imageUrl}
            size="h-full w-full"
          />

          <div
            className={`absolute bottom-[2px] right-[5px] w-5 h-5 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
              onImageUpload ? "" : "pointer-events-none"
            }`}
            onClick={handleImageClick}
          >
            {isUploading ? (
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <CameraIcon width={20} height={20} />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-col">
          <Typography
            size="sm"
            weight="extrabold"
            className="text-secondary-100"
          >
            {fullName}
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
