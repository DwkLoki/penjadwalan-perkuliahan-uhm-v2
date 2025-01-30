import MainAppNav from "../components/MainAppNav"
import { Outlet } from "react-router-dom"

export default function MainApp() {
    return (
        <div className="w-[95%] p-12">
            <header className="border-b-2">
                <h1 className="text-5xl font-bold mb-5 pb-1 bg-gradient-to-r from-sky-600 to-cyan-400 inline-block text-transparent bg-clip-text">Sistem Penjadwalan</h1>
            </header>
            <nav>
                <MainAppNav />
            </nav>
            <main className="my-4 px-6">
                <Outlet />
            </main>
        </div>
    )
}