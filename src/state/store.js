import { configureStore } from "@reduxjs/toolkit";
import pengampuReducer from './slices/pengampuSlice'
import pesananReducer from './slices/pesananSlice'
import jadwalTidakBersediaReducer from './slices/jadwalTidakBersediaSlice'

const store = configureStore({
    reducer: {
        pengampu: pengampuReducer, 
        pesanan: pesananReducer,
        jadwalTidakBersedia: jadwalTidakBersediaReducer
    }
})

export default store;