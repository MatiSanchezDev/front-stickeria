import { SectionCardSticker } from "./SectionCardSticker";
import { SectionOrderSticker } from "./SectionOrderSticker";

export const Dashboard = () => {
  return (
    <div className="p-6 w-full h-auto">
      <h1 className="text-center text-4xl font-bold pt-4">Stickeria App</h1>
      <div className="w-full h-auto flex p-4">
        <h3 className="w-1/2 text-center text-2xl">Todos Los Stickers</h3>
        <h3 className="w-1/2 text-center text-2xl">Tu Orden actual</h3>
      </div>
      <div className="w-full h-auto flex divide-x divide-black/15">
        <SectionCardSticker />
        <SectionOrderSticker />
      </div>
    </div>
  );
};
