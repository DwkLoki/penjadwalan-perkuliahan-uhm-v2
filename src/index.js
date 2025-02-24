import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomePage from './pages/HomePage';
import MainApp from './pages/MainApp';
import GuidePage from './pages/GuidePage';
import LecturerPage from './pages/LecturerPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SideBar from './components/SideBar';
import JadwalPesananPage from './pages/JadwalPesananPage';
import HasilPenjadwalanPage from './pages/HasilPenjadwalanPage';
import {Provider} from 'react-redux'
import store from './state/store'

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
                element: <JadwalPesananPage/>
            },
            {
                path: '/aplikasi/hasil-penjadwalan',
                element: <HasilPenjadwalanPage/>
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
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
