import { createSlice } from "@reduxjs/toolkit";

const pesananSlice = createSlice({
    name: 'pesanan', 
    initialState: JSON.parse(localStorage.getItem('pesanan')) || [],
    reducers: {
        addPesanan: (state, action) => {
            const jadwalPesananBaru = {
                ...action.payload,
                hari: '',
                waktu: '',
                ruangan: ''
            }

            state.push(jadwalPesananBaru);
        },
        editPesanan: (state, action) => {
            return state.map(item => {
                return item.pengampuId === action.payload.pengampuId ? action.payload : item
            })
        },
        deletePesanan: (state, action) => {
            return state.filter((pesanan) => pesanan.pengampuId !== action.payload.pengampuId)
        },
        resetPesanan: () => {
            return [];  // mengembalikan array kosong
        },
    }
})

export const { addPesanan, editPesanan, deletePesanan, resetPesanan } = pesananSlice.actions
export default pesananSlice.reducer