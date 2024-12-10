import Image from "next/image";
import Pikachu from "/public/img/detetivePikachu.png"


export default function Login(){
    

    return (
        <div className="flex gap-12 mx-24 mt-12 justify-center">
        <Image src={Pikachu} alt="Pikachu com uma lupa e um chapéu marrom de detetive" width={512}/>

        <form 
        className="flex flex-col border-2 rounded-xl place-items-center w-4/12 justify-center"
        >
            <h1 className="mb-12 text-3xl font-bold mt-4">Login</h1>
            <div className="flex flex-col">
                <label htmlFor="email" className="ml-1 font-medium">E-mail</label>
                <input type="email" name="email" id="email" 
                placeholder="Digite seu e-mail" className="border-2 h-12 rounded-xl p-1.5 w-80 mb-12"/>
            </div>

            <div className="flex flex-col">
                <label htmlFor="senha" className="ml-1 font-medium">Senha</label>
                <input type="password" name="senha" id="senha" 
                placeholder="Digite sua senha" className="border-2 h-12 rounded-xl p-1.5 w-80 mb-12"/>
            </div>
            
            <button 
            className="border-2 w-40 h-12 p-2 bg-orange-500 rounded-lg 
            text-white text-lg font-bold hover:bg-orange-700 transition duration-200"
            >Login</button>
            
            <p className="mt-4 font-medium">Não tem uma conta? <a href={'/registrar'} className="text-orange-500 font-medium text hover:underline">Registre-se!</a></p>
        </form>
        </div>
    )
}

