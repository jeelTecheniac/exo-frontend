import React, { useEffect, useState } from "react";

interface AvatarProps {
  firstName: string;
  lastName?: string;
  imageUrl?: string;
  size?: string; // Tailwind size classes, e.g., "w-10 h-10"
}

const bgColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-teal-500",
];

const getInitials = (first: string, last?: string) => {
  const firstInitial = first?.charAt(0).toUpperCase() || "";
  const lastInitial = last?.charAt(0).toUpperCase() || "";
  return `${firstInitial}${lastInitial}`;
};

const getRandomColor = (name: string) => {
  const index = name.charCodeAt(0) % bgColors.length;
  return bgColors[index];
};

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  imageUrl,
  size = "w-10 h-10",
}) => {
  const initials = getInitials(firstName, lastName);
  const bgColor = getRandomColor(firstName + (lastName || ""));
  const [imgExists, setImgExists] = useState<boolean>(false);

  useEffect(() => {
    if (!imageUrl) {
      setImgExists(false);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImgExists(true);
    img.onerror = () => setImgExists(false);
  }, [imageUrl]);

  return imgExists ? (
    <img
      src={imageUrl}
      alt={`${firstName} ${lastName}`}
      className={`rounded-full object-cover ${size}`}
    />
  ) : (
    <div
      className={`w-full h-full flex items-center justify-center rounded-full text-white font-medium ${bgColor} ${size}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
