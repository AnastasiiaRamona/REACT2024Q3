export interface HeroCardProps {
  key: string;
  id: string;
  name: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
