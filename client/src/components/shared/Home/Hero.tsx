import { Button } from "../../ui/button";

import bg from "@/assets/hero-1.png";

const mockHero = {
  title: "Unleash Innovation",
  subtitle: "Explore a World of Cutting-Edge Tech",
  imageUrl: bg,
};

const Hero = () => {
  return (
    <div
      className="w-full max-w-[calc(1920px-22vw)] mx-auto bg-gray bg-no-repeat bg-cover bg-right h-[300px] sm:h-[450px] lg:h-[520px] xl:h-[600px]"
      style={{
        backgroundImage: `url(${mockHero.imageUrl})`,
        backgroundPosition: "right top",
      }}
    >
      <div className="flex flex-col justify-center items-start px-6 lg:px-[11vw] h-full">
        <h2 className="h2-bold">Unleash Innovation</h2>
        <h2 className="h2-bold">in Every Byte.</h2>
        <p className="text-4 mt-2">{mockHero.subtitle}</p>
        <Button className="mt-4 lg:mt-6">Shop</Button>
      </div>
    </div>
  );
};

export default Hero;
