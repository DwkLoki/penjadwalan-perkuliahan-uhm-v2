import { NavLink, useLocation } from "react-router-dom"

export default function MainAppNav() {
    const location = useLocation();
    const isActive = location.pathname === '/aplikasi' || location.pathname === '/aplikasi/pengampu';

    return (
        <div className="flex justify-center space-x-9 border-b-2 p-4">
            <div>
                <NavLink 
                    to='/aplikasi/pengampu'
                    // className={({isActive}) => 
                    //     `px-3 pb-[18px] ${isActive ? 'text-black border-black border-b-2' : 'text-zinc-600'}`
                    // }
                    className={`px-3 pb-[18px] ${isActive ? 'text-black border-black border-b-2' : 'text-zinc-600'}`}
                >
                    Data Pengampu
                </NavLink>
            </div>
            <div>
                <NavLink 
                    to='/aplikasi/jadwal-pesanan'
                    className={({ isActive }) =>
                        `px-3 pb-[18px] ${isActive ? 'text-black border-black border-b-2' : 'text-zinc-600'}`
                    }
                >
                    Data Tambahan
                </NavLink>
            </div>
            <div>
                <NavLink 
                    to='/aplikasi/jadwal-tidak-bersedia-mengajar'
                    className={({ isActive }) =>
                        `px-3 pb-[18px] ${isActive ? 'text-black border-black border-b-2' : 'text-zinc-600'}`
                    }
                >
                    Hasil Penjadwalan
                </NavLink>
            </div>
        </div>
    )
}