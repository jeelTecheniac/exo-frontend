import Input, { InputProps } from "./Input";
import { useState } from "react";
import Typography from "./Typography";

type CurrencyOption = {
  value: string;
  label: string;
  flag: React.ReactNode; // Changed from string to ReactNode to accept SVG components
};

interface Props extends Omit<InputProps, "value" | "onChange"> {
  error?: boolean;
  hint?: string;
  options: CurrencyOption[];
  currency?: string;
  value?: string;
  onChange?: (value: string, currency: string) => void;
}

const CurrencyInput = ({
  value = "",
  options,
  error,
  hint,
  onChange,
  className = "",
  ...props
}: Props) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    options[0]?.value || "USD"
  );
  const [isOpen, setIsOpen] = useState(false);

  const formatNumber = (num: string) => {
    const numStr = num.replace(/[^0-9]/g, "");
    if (!numStr) return "";
    const number = parseInt(numStr, 10);
    return new Intl.NumberFormat("en-US").format(number);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    onChange?.(value, currency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(newValue)) {
      onChange?.(newValue, selectedCurrency);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selectedCurrency);

  return (
    <div className="flex flex-col gap-1 w-full bg-secondary-10">
      <div
        className={`flex items-center gap-2 rounded-lg bg-secondary-10 ${
          error
            ? "border border-red focus-within:border-red"
            : "border border-secondary-30 focus-within:border-secondary-50"
        } ${className}`}
      >
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-5 h-4">{selectedOption?.flag}</div>
            <span className="text-sm font-medium">{selectedOption?.value}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-30 rounded-lg shadow-lg z-10">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-secondary-10 focus:outline-none"
                  onClick={() => handleCurrencyChange(option.value)}
                >
                  <div className="w-5 h-4">{option.flag}</div>
                  <span className="text-sm">{option.value}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="h-6 w-px bg-secondary-30" />
        <Input
          value={formatNumber(value)}
          type="text"
          placeholder="0"
          className="border-none flex-1 pr-4"
          onChange={handleAmountChange}
          {...props}
        />
      </div>
      {error && hint && (
        <Typography className="text-sm text-red ml-3 bg-secondary-10">
          {hint}
        </Typography>
      )}
    </div>
  );
};

export default CurrencyInput;
