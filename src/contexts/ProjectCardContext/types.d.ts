export interface IProjectCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  percentage: number;
}

export interface ProjectCardContextType {
  projectCards: IProjectCardProps[];
  handleFixCard: (id: string) => void;
  handleDeleteCard: (id: string) => void;
  fixedCards: string[];
}

export interface ProjectCardProviderProps {
  children: React.ReactNode;
}
