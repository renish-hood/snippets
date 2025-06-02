import React from "react";

export const Popover = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block">{children}</div>;
};

export const PopoverTrigger = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  if (!children) {
    return null;
  }

  if (asChild) {
    return children;
  }

  return React.createElement(
    (children as React.ReactElement).type,
    {
      ...((children as React.ReactElement).props as object),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        const content = e.currentTarget.nextElementSibling as HTMLElement;
        if (content) {
          content.style.display =
            content.style.display === "block" ? "none" : "block";
        }
      },
    },
    children
  );
};

export const PopoverContent = ({
  children,
  className = "",
  align = "start",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
}) => {
  const alignClasses = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 transform -translate-x-1/2",
  };

  return (
    <div
      className={`absolute top-full mt-2 ${alignClasses[align]} bg-white border border-gray-200 rounded-md shadow-lg z-50 ${className}`}
      style={{ display: "none" }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
