import { NavLink } from "react-router-dom"
import { AiOutlineSchedule, AiOutlineHome } from "react-icons/ai";
import { GoBook } from "react-icons/go";

export default function SideBar() {
    return (
        <div className="h-screen w-[65px] border-e-2 sticky top-0">
            <nav className="flex flex-col items-center space-y-5 my-6">
                <div className="w-1/2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex p-1 ${isActive ? 'bg-sky-600 rounded text-white' : 'text-zinc-600'}`
                        }
                    >
                        <span className="size-full">
                            <AiOutlineHome className="size-full" />
                        </span>
                    </NavLink>
                </div>
                <div className="w-1/2">
                    <NavLink
                        to="/aplikasi"
                        className={({ isActive }) =>
                            `flex p-1 ${isActive ? 'bg-sky-600 rounded text-white' : 'text-zinc-600'}`
                        }
                    >
                        <span className="size-full">
                            <AiOutlineSchedule className="size-full" />
                        </span>
                    </NavLink>
                </div>
                <div className="w-1/2">
                    <NavLink
                        to="/panduan"
                        className={({ isActive }) =>
                            `flex p-1 ${isActive ? 'bg-sky-600 rounded text-white' : 'text-zinc-600'}`
                        }
                    >
                        <span className="size-full">
                            <GoBook className="size-full" />
                        </span>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}