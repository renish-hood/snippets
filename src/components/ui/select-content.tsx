import { PropsWithChildren } from "react";
import React from "react";

export const SelectContent = ({
  children,
  onSelect,
}: PropsWithChildren<{ onSelect: (value: string) => void }>) => (
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
