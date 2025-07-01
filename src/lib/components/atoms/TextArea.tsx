import { FC, TextareaHTMLAttributes, useEffect, useRef } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  success?: boolean;
  hint?: string;
}

const TextArea: FC<TextAreaProps> = ({
  error,
  success = false,
  hint,
  className = "",
  disabled = false,
  value,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set the height to match the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Adjust height on value change
  useEffect(() => {
    adjustHeight();
  }, [value]);

  const baseClasses =
    "w-full min-h-[100px] resize-none rounded-lg border p-3 text-base focus:outline-none placeholder:text-secondary-50 overflow-hidden";

  const stateClasses = disabled
    ? "cursor-not-allowed bg-gray-100 text-gray-500 border-gray-300"
    : error
    ? "border-red focus:border-red"
    : success
    ? "border-green-500 focus:border-green-600"
    : "border-secondary-30 focus:border-primary-50 bg-white";

  return (
    <div className="space-y-1">
      <textarea
        ref={textareaRef}
        className={`${baseClasses} ${stateClasses} ${className}`}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          props.onChange?.(e);
          adjustHeight();
        }}
        {...props}
      />

      {(error || hint) && (
        <p className={`text-xs ${error ? "text-red" : "text-gray-500"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
