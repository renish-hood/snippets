export const Badge = ({
  children,
  variant = "default",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  onClick?: () => void;
}) => {
  const variants = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-300 bg-white text-gray-700",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
