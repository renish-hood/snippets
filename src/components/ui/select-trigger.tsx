import { ChevronDown } from "lucide-react";
import { PropsWithChildren } from "react";

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
