import GameCard from "@/components/GameCard";
import { FadeIn } from '@/components/FadeIn';
import Footer from "@/components/Footer";

// 游戏数据
const games = [
  {
    title: "Blockade",
    description: "经典的街机游戏",
    imageUrl: "/games/blockade/cover.jpg", // 确保在public目录下有对应的图片
    htmlPath: "/games/Blockade.html"
  },
  {
    title: "游戏2",
    description: "游戏2描述",
    imageUrl: "/games/game2/cover.jpg",
    htmlPath: "/games/Game2.html"
  },
  {
    title: "游戏2",
    description: "游戏2描述",
    imageUrl: "/games/game2/cover.jpg",
    htmlPath: "/games/Game2.html"
  },
  {
    title: "Tetris",
    description: "经典俄罗斯方块",
    imageUrl: "/games/tetris/cover.jpg",
    htmlPath: "/games/Tetris.html"
  },
  // 添加更多游戏...
];

const onlineGames = [
  {
    title: "游戏1",
    description: "游戏1描述",
    imageUrl: "/games/game1/cover.jpg",
    htmlPath: "/games/Game1.html"
  }
]
export default function Games() {
  return (
    <>
      <div className="container mx-auto min-h-[calc(100vh-11rem)] px-4 py-4 overflow-hidden">
        <h3 className="text-xl font-bold m-5">单机游戏</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game, index) => (
            <FadeIn 
              key={index}
              delay={index * 0.1}
            >
              <GameCard
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                htmlPath={game.htmlPath}
              />
            </FadeIn>
          ))}
        </div>
        <h3 className="text-xl font-bold m-5">联网游戏（根据服务器状态可能不可用）</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {onlineGames.map((game, index) => (
            <FadeIn 
              key={index}
              delay={index * 0.1}
            >
              <GameCard
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                htmlPath={game.htmlPath}
              />
            </FadeIn>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}