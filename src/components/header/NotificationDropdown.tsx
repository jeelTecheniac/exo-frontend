import { useState } from "react";

import { Dropdown } from "../../lib/components/atoms/Dropdown";
import { NotificationIcon } from "../../icons";
import Typography from "../../lib/components/atoms/Typography";
import { useTranslation } from "react-i18next";

export default function NotificationDropdown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      heading: "Renovation Project request is approved.",
      time: "Today at 1:30 PM",
      isRead: false,
    },
    {
      heading: "Reminder: Task ‘Submit proposal’ is due tomorrow.",
      time: "Today at 1:30 PM",
      isRead: true,
    },
    {
      heading: "Rapid Return System project request is sent for approval.",
      time: "Today at 1:30 PM",
      isRead: true,
    },
    {
      heading:
        "Upcoming deadline: Request Vertex Compliance Hub is due for submission in 3 days",
      time: "Today at 1:30 PM",
      isRead: true,
    },
    {
      heading: "Renovation Project request is approved.",
      time: "Today at 1:30 PM",
      isRead: true,
    },
  ]);

  function toggleDropdown() {
    setIsOpen(true);
    // Mark all as read when dropdown is opened
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
  };

  // Separate unread and read notifications
  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  return (
    <div className="relative">
      <div className="relative inline-block">
        <NotificationIcon
          onClick={handleClick}
          width={26}
          height={26}
          className="cursor-pointer"
        />
        {unread.length > 0 && (
          <span
            className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 border-2 border-white"
            style={{ transform: "translate(50%,-50%)" }}
          />
        )}
      </div>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute !-right-[305px] mt-[17px] flex h-[400px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {t("notification")}
          </h5>
          <button
            onClick={closeDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <Typography size="xs" weight="semibold" className="text-secondary-50">
          {t("today")}
        </Typography>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar mt-2 gap-3">
          {unread.length > 0 && (
            <>
              <li className="text-xs font-bold text-blue-600 mb-1">
                {t("Unread")}
              </li>
              {unread.map((l, index) => (
                <div
                  key={"unread-" + index}
                  className="notification-unread flex flex-col gap-1 rounded p-2"
                >
                  <Typography
                    size="xs"
                    weight="semibold"
                    className="text-secondary-100"
                  >
                    {l.heading}
                  </Typography>
                  <Typography
                    size="xs"
                    weight="semibold"
                    className="text-secondary-50"
                  >
                    {l.time}
                  </Typography>
                </div>
              ))}
            </>
          )}
          {read.length > 0 && (
            <>
              {unread.length > 0 && (
                <li className="text-xs font-bold text-gray-400 mt-2 mb-1">
                  {t("Read")}
                </li>
              )}
              {read.map((l, index) => (
                <div
                  key={"read-" + index}
                  className="notification-read flex flex-col gap-1 rounded p-2"
                >
                  <Typography
                    size="xs"
                    weight="semibold"
                    className="text-secondary-100"
                  >
                    {l.heading}
                  </Typography>
                  <Typography
                    size="xs"
                    weight="semibold"
                    className="text-secondary-50"
                  >
                    {l.time}
                  </Typography>
                </div>
              ))}
            </>
          )}
        </ul>
        {/* <Link
          to="/"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </Link> */}
      </Dropdown>
    </div>
  );
}
