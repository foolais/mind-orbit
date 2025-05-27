interface BadgeProps {
  option: {
    value: string;
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
  };
}

const Badge = ({ option }: BadgeProps) => {
  return (
    <div
      className={`px-2 py-1 flex items-center rounded-md text-sm ${option.bgColor} ${option.textColor}`}
    >
      <span
        className="size-2.5 rounded-md mr-2"
        style={{ backgroundColor: option.color }}
      />
      {option.label}
    </div>
  );
};

export default Badge;
