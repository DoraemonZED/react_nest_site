import { Card, CardBody, CardFooter, Image } from "@heroui/react";

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  htmlPath: string;
}

export default function GameCard({ title, description, imageUrl, htmlPath }: GameCardProps) {
  const handlePress = () => {
    setTimeout(() => {
      window.open(htmlPath, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  return (
    <Card 
      isPressable 
      isHoverable
      onPressUp={handlePress}
      className="w-full h-full"
      classNames={{
        base: "transition-transform active:scale-95 hover:scale-105",
      }}
    >
      <CardBody className="p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={title}
          className="w-full object-cover h-[140px]"
          src={imageUrl}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
        <p className="text-small text-default-500">{description}</p>
      </CardFooter>
    </Card>
  );
} 