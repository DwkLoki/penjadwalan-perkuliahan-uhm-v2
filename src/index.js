import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage';
import MainApp from './pages/MainApp';
import GuidePage from './pages/GuidePage';
import LecturerPage from './pages/LecturerPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SideBar from './components/SideBar';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div className='flex font-inter'>
                <SideBar />
                <HomePage />
            </div>
        )
    },
    {
        path: '/aplikasi',
        element: (
            <div className='flex font-inter'>
                <SideBar />
                <MainApp />
            </div>
        ),
        children: [
            {
                index: true,
                element: <LecturerPage />
            },
            {
                path: '/aplikasi/pengampu',
                element: <LecturerPage />
            },
            {
                path: '/aplikasi/jadwal-pesanan',
                element: <h1>jadwal pesanan</h1>
            },
            {
                path: '/aplikasi/jadwal-tidak-bersedia-mengajar',
                element: <h1>jadwal tidak bersedia mengajar</h1>
            }
        ]
    },
        {
        path: '/panduan',
        element: (
            <div className='flex font-inter'>
                <SideBar />
                <GuidePage />
            </div>
        )
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
