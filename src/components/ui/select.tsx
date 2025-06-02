import { PropsWithChildren, useState } from "react";
import { ChevronDown } from "lucide-react";
import React from "react";
export const Select = ({
  children,
  value,
  onValueChange,
}: PropsWithChildren<{
  value: string;
  onValueChange: (value: string) => void;
}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} className="w-40">
        <SelectValue placeholder="Select..." value={selectedValue} />
      </SelectTrigger>
      {isOpen && (
        <SelectContent onSelect={handleSelect}>{children}</SelectContent>
      )}
    </div>
  );
};

export const SelectValue = ({
  placeholder,
  value,
}: {
  placeholder: string;
  value?: string;
}) => {
  const displayValue = value === "all" ? placeholder : value;
  return <span>{displayValue || placeholder}</span>;
};

export const SelectTrigger = ({
  children,
  className = "",
  onClick,
}: PropsWithChildren<{ className?: string; onClick?: () => void }>) => (
  <button
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    onClick={onClick}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
);

SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = ({
  children,
  onSelect,
}: PropsWithChildren<{ onSelect?: (value: string) => void }>) => (
  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.createElement(child.type, {
            ...(child.props as object),
            onSelect,
          })
        : child
    )}
  </div>
);
export const SelectItem = ({
  children,
  value,
  onSelect,
}: PropsWithChildren<{
  value: string;
  onSelect: (value: unknown) => void;
}>) => (
  <div
    className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
    onClick={() => onSelect(value)}
  >
    {children}
  </div>
);
