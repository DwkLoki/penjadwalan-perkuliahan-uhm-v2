import { configureStore } from "@reduxjs/toolkit";
import pengampuReducer from './slices/pengampuSlice'

const store = configureStore({
    reducer: {
        pengampu: pengampuReducer
    }
})

export default store;