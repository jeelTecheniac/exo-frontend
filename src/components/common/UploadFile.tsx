import { t } from "i18next";
import { useState, useRef, useEffect } from "react";
export interface UploadedFile {
  file: File | undefined;
  id: string;
  url: string;
}
interface FileUploadProps {
  onFilesSelect?: (files: UploadedFile[]) => void;
  onUploadFile?: (
    file: File,
    onProgress: (percent: number) => void
  ) => Promise<{ id: string; url: string }>;
  onDeleteFile?: (fileId: string) => Promise<any>;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  maxFiles?: number;
  files?: UploadedFile[];
}

const UploadFile: React.FC<FileUploadProps> = ({
  onFilesSelect,
  onUploadFile,
  maxSize = 10, // Default max size 10MB
  acceptedFormats = [".pdf", ".doc", ".docx", ".txt", ".png"],
  maxFiles = 5,
  files,
  onDeleteFile,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string>("");
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [removingFile, setRemovingFile] = useState<boolean>(false);

  useEffect(() => {
    if (files) setSelectedFiles(files);
  }, [files]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File ${file.name} exceeds maximum size of ${maxSize}MB`);
      return false;
    }
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setError(
        `File ${file.name} is not a supported format. Supported formats: PDF, DOC, TXT and PNG`
      );
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList) => {
    setError("");
    if (selectedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    const newFiles = Array.from(files).filter(validateFile);
    newFiles.forEach(uploadFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };
  const uploadFile = async (file: File) => {
    setUploadingFiles((prev) => new Set(prev).add(file.name));
    setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
    try {
      let uploaded: { id: string; url: string };
      if (onUploadFile) {
        uploaded = await onUploadFile(file, (percent) => {
          setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        uploaded = { id: file.name, url: URL.createObjectURL(file) };
      }
      const uploadedFile = { file, id: uploaded.id, url: uploaded.url };
      setSelectedFiles((prev) => {
        const updated = [...prev, uploadedFile];
        onFilesSelect?.(updated);
        return updated;
      });
    } catch (err) {
      console.log(err, "er");

      setError(`Failed to upload ${file.name}`);
    } finally {
      setUploadingFiles((prev) => {
        const updated = new Set(prev);
        updated.delete(file.name);
        return updated;
      });
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  const removeFile = async (data: any) => {
    setRemovingFile(true);
    const response = await onDeleteFile?.(data.id);
    if (response.status) {
      setRemovingFile(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border border-dashed rounded-lg p-10 bg-[#f8fafc] ${
          dragActive ? "border-blue-500" : "border-gray-300"
        } flex flex-col items-center justify-center cursor-pointer`}
        onDragEnter={() => {
          setDragActive(true);
        }}
        onDragLeave={() => {
          setDragActive(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
        onClick={handleBoxClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={acceptedFormats.join(",")}
          onChange={handleChange}
          multiple
        />
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12V16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            {t("drag_and_drop_file_here_or")}
            <span className="text-primary-150 font-medium cursor-pointer">
              {t("browse")}
            </span>
          </p>
          <p className="text-xs text-gray-500 mb-1">
            {t("maximum_file_size")} {maxSize} MB
          </p>
          <p className="text-xs text-gray-500">
            {t("supported_formats_pdf_doc_txt_and_ppt")}
          </p>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles
            .filter((file) => file.file && !uploadingFiles.has(file.file.name))
            .map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#f87171"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="2"
                        width="16"
                        height="20"
                        rx="2"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M7 15L7.621 12.929C8.149 11.174 8.412 10.296 9.109 9.898C9.317 9.79 9.545 9.724 9.779 9.704C10.386 9.656 11.069 10.093 12.434 10.968L13.661 11.736C14.507 12.27 14.93 12.537 15.385 12.605C15.544 12.629 15.706 12.629 15.865 12.605C16.32 12.537 16.743 12.27 17.589 11.736L19 10.877"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 3H16L19 6V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 7L15 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11L13 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 15H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {file.file && file.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.file && (file.file.size / (1024 * 1024)).toFixed(2)}
                      MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await removeFile(file);
                  }}
                  className="text-red-500 hover:text-red-600 rounded-full p-1 hover:bg-red-50 disabled:text-red-400"
                  disabled={removingFile}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M16 8L8 16M8 8L16 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      )}
      {[...uploadingFiles].length > 0 &&
        [...uploadingFiles].map((fileName, index) => {
          const file = fileName;
          const progress = uploadProgress[fileName] || 0;
          return (
            file && (
              <div
                key={`uploading-${index}`}
                className="flex items-center justify-between mt-4 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center flex-grow">
                  <div className="flex-grow mr-4">
                    <p className="text-sm font-medium text-gray-800">
                      {t("uploading")} {file}...
                    </p>
                    <div className="w-full h-[6px] bg-blue-100 rounded-full mt-1">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    // await removeFile(file);
                  }}
                  className="text-red-500 hover:text-red-600 rounded-full p-1 hover:bg-red-50 flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M16 8L8 16M8 8L16 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button> */}
              </div>
            )
          );
        })}
    </div>
  );
};

export default UploadFile;
