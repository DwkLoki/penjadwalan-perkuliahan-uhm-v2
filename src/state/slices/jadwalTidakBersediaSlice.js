import { createSlice } from "@reduxjs/toolkit";

const jadwalTidakBersediaSlice = createSlice({
    name: 'jadwalTidakBersedia',
    initialState: JSON.parse(localStorage.getItem('jadwalTidakBersedia')) || [],
    reducers: {
        addJadwalTidakBersedia: (state, action) => {
            // Buat objek baru dengan menambahkan id unik
            const jadwalTidakBersediaBaru = {
                ...action.payload,
                id: Date.now()
            }

            state.push(jadwalTidakBersediaBaru);
        },
        editJadwalTidakBersedia: (state, action) => {
            return state.map(item => {
                return item.id === action.payload.id ? action.payload : item
            })
        },
        deleteJadwalTidakBersedia: (state, action) => {
            return state.filter((jadwalTidakBersedia) => jadwalTidakBersedia.id !== action.payload.id)
        },
    }
})

export const { addJadwalTidakBersedia, editJadwalTidakBersedia, deleteJadwalTidakBersedia } = jadwalTidakBersediaSlice.actions
export default jadwalTidakBersediaSlice.reducer