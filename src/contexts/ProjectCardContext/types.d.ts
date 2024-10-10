export interface IProjectCardProps {
  url: string;
  title: string;
  description: string;
  percentage: number;
}

export interface ProjectCardContextType {
  projectCards: IProjectCardProps[];
}

export interface ProjectCardProviderProps {
  children: React.ReactNode;
}
