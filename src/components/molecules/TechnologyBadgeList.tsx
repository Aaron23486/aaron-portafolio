import { Badge, type BadgeProps } from "@/components/atoms/Badge";

export interface TechnologyBadgeListProps {
  label: string;
  items: readonly string[];
  tone?: BadgeProps["tone"];
}

export function TechnologyBadgeList({
  label,
  items,
  tone,
}: TechnologyBadgeListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge tone={tone}>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
