export const Checkbox = ({
  checked,
  onCheckedChange,
  id,
  className = "",
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
  className?: string;
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${className}`}
    />
  </div>
);
