export function CardCustomer(){
    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>Nome: Rafaela</h2>
            <p><a className="font-bold">Email: </a>Rafaela@gmail.com</p>
            <p><a className="font-bold">Telefone: </a>(51) 99999-9999</p>
            <button className="bg-red-500 text-white px-4 rounded mt-2 self-start">
                Deletar
            </button>
        </article>
    )
}