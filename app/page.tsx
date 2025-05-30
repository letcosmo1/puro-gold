import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {

  return (
    <div className="relative h-dvh bg-svg-top bg-svg-bottom overflow-hidden">
      <div className="relative z-10 p-4 h-full">
        <main className="h-full flex flex-col justify-center items-center">
          <Image 
            src="/images/logo-2-color-rounded-no-bg.png" 
            alt="Puro Gold Logo" 
            width="250" 
            height="224"
          />
          <Link href="/login">
            <Button className="w-48 mt-8 bg-primary">ADM</Button>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;


