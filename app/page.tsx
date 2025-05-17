import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {

  return (
    <div className="relative h-screen bg-svg-top bg-svg-bottom overflow-hidden">
      <div className="relative z-10 p-4 h-full">
        <main className="h-full flex flex-col justify-center items-center">
          <Image 
            src="/images/logo-2-color-rounded-no-bg.svg" 
            alt="Puro Gold Logo" 
            width="250" 
            height="250"
          />
          <Button className="w-48 mt-8">Entrar</Button>
        </main>
      </div>
    </div>
  );
}

export default Home;


