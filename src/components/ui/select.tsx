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
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-40 flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="truncate">
            <SelectValue value={selectedValue} placeholder="Select..." />
          </span>
          <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
        </button>
      </div>

      {isOpen && (
        <SelectContent onSelect={handleSelect}>
          {children}
        </SelectContent>
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
  <button type="button" className={className} onClick={onClick}>
    {children}
  </button>
);

SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = ({
  children,
  onSelect,
}: PropsWithChildren<{ onSelect?: (value: string) => void }>) => (
  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg">
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? React.cloneElement(child as React.ReactElement<any>, {
          ...(child.props as Record<string, unknown>),
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
  onSelect?: (value: string) => void;
}>) => (
  <div
    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
    onClick={() => onSelect?.(value)}
  >
    {children}
  </div>
);