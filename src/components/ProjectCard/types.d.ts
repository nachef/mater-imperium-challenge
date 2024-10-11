export interface ICardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  percentage: number;
}

export interface IProjectCardProps extends ICardProps {
  isActive: boolean;
  onToggle: () => void;
  onFix: () => void;
  onDelete: (id: string) => void;
  isFixed: boolean;
  disableFix: boolean;
}
