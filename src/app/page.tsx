import Image from "next/image";
import heroImage from '@/assets/hero.svg'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
     <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
     <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4x1">Atendimentos e clientes</h1>
     <Image 
      src={heroImage}
      alt="Imagem hero easy control"
      width={600}
      className="max-w-sm md:max-w-xl"
     />
    </main>
  );
}
