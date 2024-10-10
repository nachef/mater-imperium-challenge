export interface ICardProps {
  url: string;
  title: string;
  description: string;
  percentage: number;
}

export interface IProjectCardProps extends ICardProps {
  isActive: boolean;
  onToggle: () => void;
}
