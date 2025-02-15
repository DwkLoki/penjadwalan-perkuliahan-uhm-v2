import { createSlice } from "@reduxjs/toolkit";

const pengampuSlice = createSlice({
    name: 'pengampu',
    initialState: JSON.parse(localStorage.getItem('pengampu')) || [],
    reducers: {
        setPengampu: (state, action) => {
            return action.payload;
        },
        addPengampu: (state, action) => {
            // Cari nilai pengampuId terbesar dari data yang ada
            const maxId = Math.max(...state.map(item => item.pengampuId), 0);

            // Buat objek baru dengan pengampuId = maxId + 1
            const pengampuBaru = {
                ...action.payload,
                pengampuId: maxId + 1
            }

            state.push(pengampuBaru);
        },
        editPengampu: (state, action) => {
            return state.map(item => {
                return item.pengampuId === action.payload.pengampuId ? action.payload : item
            })
        },
        deletePengampu: (state, action) => {
            return state.filter((pengampu) => pengampu.pengampuId !== action.payload.pengampuId)
        },
        addPengampuFromPesanan: (state, action) => {
            // buat objek baru sesuai format data pengampu
            const pengampuBaru = {
                pengampuId: action.payload.pengampuId,
                courseName: action.payload.courseName,
                lecturerName: action.payload.lecturerName,
                className: action.payload.className,
                semester: action.payload.semester,
                jumlahSks: action.payload.jumlahSks,
                jenisMatkul: action.payload.jenisMatkul,
                kategoriKelas: action.payload.kategoriKelas,
                fakultas: action.payload.fakultas,
            }

            state.push(pengampuBaru)
        }
    }
})

export const { setPengampu, addPengampu, editPengampu, deletePengampu, addPengampuFromPesanan } = pengampuSlice.actions
export default pengampuSlice.reducer