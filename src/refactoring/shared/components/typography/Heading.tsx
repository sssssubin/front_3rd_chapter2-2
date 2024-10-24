interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({
  level = 1,
  children,
  className = "",
}: HeadingProps) => {
  const sizes = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`font-bold ${sizes[level]} ${className}`}>{children}</Tag>
  );
};
