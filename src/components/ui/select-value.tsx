export const SelectValue = ({
  placeholder,
  value,
}: {
  placeholder: string;
  value: string;
}) => {
  const displayValue = value === "all" ? placeholder : value;
  return <span>{displayValue || placeholder}</span>;
};
