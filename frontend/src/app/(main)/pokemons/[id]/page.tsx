import Image from "next/image";
import Charmander from "/public/img/charmander.png"
import Charizard from "/public/img/charizard.png"
import Charmeleon from "/public/img/charmeleon.png"


export default function Pokemon() {


    return (
        <div className="flex flex-col place-items-center">
            <div className="flex mt-16">

                <div id="imagemPokemon" className="w-[70%] place-items-center flex">
                    <Image src={Charmander} alt="Charmander" width={420} />

                </div>

                <div id="infoPokemon" className="flex flex-col ml-8 w-[60%]">
                    <h1 className="text-4xl font-semibold mb-2 mt-12">
                        Charmander
                    </h1>
                    <p className="text-xl mt-2 mb-2">Tipo</p>
                    <p id="tipoPokemon" className="rounded-xl bg-red-600 text-xl text-white text-center w-1/3 h-8">Fogo</p>

                    <div className="bg-orange-200 mt-4 text-xl text-semibold h-32 pl-4 pt-4 rounded-xl">
                        <p>Altura: 0.6 m</p>
                        <p>Peso: 8.5 kg</p>
                        <p>Habilidades: Blaze</p>
                    </div>

                </div>


            </div>

                <div id="evolucaoPokemon" className="mt-[4.5rem] space-x-2 justify-evenly place-items-center flex bg-orange-300 rounded-2xl w-[40%]">

                    <Image src={Charmander} alt="Charmander" width={85.33} className="opacity-75 hover:opacity-100 transition duration-200" />
                    <div className="w-0 h-0
                border-t-[14.5px] border-t-transparent
                border-l-[20.75px] border-l-orange-600
                border-b-[14.5px] border-b-transparent">
                    </div>
                    <Image src={Charmeleon} alt="Charmander" width={85.33} className="opacity-75 hover:opacity-100 transition duration-200" />
                    <div className="w-0 h-0
                border-t-[14.5px] border-t-transparent
                border-l-[20.75px] border-l-orange-600
                border-b-[14.5px] border-b-transparent">
                    </div>

                    <Image src={Charizard} alt="Charmander" width={85.33} className="opacity-75 hover:opacity-100 transition duration-200" />

                </div>

        </div>
    )
}