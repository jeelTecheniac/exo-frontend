import { ChangeEvent, useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  ArchiveIconDark,
  BanIcon,
  EyeDarkIcon,
  PencilIcon,
  XCircleIcon,
} from "../../icons";

export interface TableHeader {
  content: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface TableProps {
  children: React.ReactNode;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  onClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
}

// Mock Table components
export const Table: React.FC<TableProps> = ({ children }) => (
  <table className="w-full border-collapse" role="grid">
    {children}
  </table>
);

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
}) => <thead className={className}>{children}</thead>;

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
}) => <tbody className={className}>{children}</tbody>;

export const TableRow: React.FC<TableRowProps> = ({ children }) => (
  <tr>{children}</tr>
);

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  isHeader = false,
  onClick,
}) => {
  const Tag = isHeader ? "th" : "td";
  return (
    <Tag
      className={className}
      onClick={onClick}
      {...(isHeader ? { scope: "col" } : {})}>
      {children}
    </Tag>
  );
};

export interface ContractData {
  id: number;
  projectName: string;
  signedBy: string;
  position: string;
  amountOfContract: number;
  currency:string,
  organization: string;
  dateOfSigning: string;
  numberOfRequests: string;
}

const ContractListTable = ({
  data,
  onDataChange,
}: {
  data: ContractData[];
  onDataChange?: (newData: ContractData[]) => void;
}) => {
  const [tableData, setTableData] = useState<ContractData[]>(data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(tableData.map((order) => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (orderId: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const handleMenuToggle = (orderId: number) => {
    setOpenMenuId(openMenuId === orderId ? null : orderId);
  };

  const tableHeader: TableHeader[] = [
    // {
    //   content: (
    //     <input
    //       type="checkbox"
    //       checked={tableData && selectedRows.length === tableData.length}
    //       onChange={handleSelectAll}
    //       className="w-4 h-4 rounded border-secondary-30 text-blue-600 focus:ring-blue-500"
    //       aria-label="Select all rows"
    //     />
    //   ),
    //   className: "w-10", // Fixed width for checkbox
    // },
    {
      content: <div className="text-nowrap">Sr No</div>,
      className: "w-16",
    },
    {
      content: <div className="text-nowrap">Project Name</div>,
      className: "min-w-[120px]",
    },
    {
      content: <div className="text-nowrap">Signed By</div>,
      className: "min-w-[120px]",
    },
    {
      content: <div className="text-nowrap">Position</div>,
      className: "w-24",
    },
    {
      content: <div className="text-nowrap">Amount of Contract</div>,
      className: "min-w-[120px]",
    },
    {
      content: <div className="text-nowrap">Organization</div>,
      className: "w-24",
    },
    {
      content: <div className="text-nowrap">Date of Signing</div>,
      className: "w-24",
    },
    {
      content: <div className="text-nowrap">Number of Requests</div>,
      className: "w-24",
    },
    {
      content: <div>Actions</div>,
      className: "w-20",
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative rounded-lg bg-white ">
      <div className="relative min-h-[225px]">
        <Table>
          <TableHeader className="border-b border-gray-100 bg-secondary-10 rounded-lg">
            <TableRow>
              {tableHeader.map((header, index) => {
                return (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-4 font-semibold text-secondary-50 text-left text-sm cursor-pointer"
                    onClick={header.onClick}>
                    {header.content}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {tableData &&
              tableData.map((data) => {
                return (
                  <TableRow key={data.id}>
                    {/* <TableCell className="px-5 py-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(data.id)}
                        onChange={() => handleSelectRow(data.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label={`Select row ${data.id}`}
                      />
                    </TableCell> */}
                    <TableCell className="px-5 py-4 text-gray-500 text-sm">
                      {data.id}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6">
                      <span className="block font-medium text-secondary-100 text-sm text-nowrap truncate">
                        {data.projectName}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6">
                      <span className="block font-medium text-secondary-100 text-sm text-nowrap truncate">
                        {data.signedBy}
                      </span>
                    </TableCell>

                    <TableCell className="px-5 py-4 sm:px-6">
                      <span className="block font-medium text-secondary-100 text-sm text-nowrap truncate">
                        {data.position}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6">
                      <div className="font-medium text-secondary-100 text-sm flex gap-2 items-center">
                        <span className="text-gray-600">{data.currency}</span>
                        <span className="block font-medium text-secondary-100 text-sm">
                          {Number(data.amountOfContract).toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6">
                      <span className="block font-medium text-secondary-100 text-sm text-nowrap">                        
                        {data.organization}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6">
                      <span className="block font-medium text-secondary-100 text-sm text-nowrap">
                        {moment(data.dateOfSigning).format("YYYY/MM/DD")}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6">
                      <span className="block font-medium text-secondary-100 text-sm text-nowrap ">
                        {data.numberOfRequests}
                      </span>
                    </TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-sm">
                      <div
                        className="relative"
                        ref={openMenuId === data.id ? menuRef : null}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuToggle(data.id);
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Open actions menu"
                          aria-haspopup="true"
                          aria-expanded={openMenuId === data.id}>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        {openMenuId === data.id && (
                          <div
                            className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2"
                            role="menu">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                //   handleViewProject(data?.projectUuid);
                              }}
                              className="rounded-sm flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                              role="menuitem"
                              aria-label="View Project">
                              <EyeDarkIcon />
                              View Project
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                //   handleEdit(data);
                              }}
                              className="rounded-sm flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                              role="menuitem"
                              aria-label="Edit">
                              <PencilIcon />
                              Edit
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // handleArchive(data.id);
                              }}
                              className="rounded-sm flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                              role="menuitem"
                              aria-label="Archive">
                              <ArchiveIconDark />
                              Archive
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // handleSuspend(data.id);
                              }}
                              className="rounded-sm flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                              role="menuitem"
                              aria-label="Suspend">
                              <BanIcon />
                              Suspend
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                //   handleDelete(data.id, data.projectUuid);
                              }}
                              className="rounded-sm flex items-center gap-2 w-full px-2 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                              role="menuitem"
                              aria-label="Close">
                              <XCircleIcon />
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContractListTable;
