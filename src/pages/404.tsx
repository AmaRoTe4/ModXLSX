import { Link } from 'react-router-dom';

export default function Page404() {
    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <div className="p-4 flex flex-col gap-2">
                <h1 className='text-[40px] font-bold'>Pagina no encontrada</h1>
                <h2 className='text-[32px] font-semibold'>Error 404</h2>
                <Link to="/" className='border border-black p-2 bg-blue-600  text-center'>
                    Inicio
                </ Link>
            </div>
        </main>
    )
}