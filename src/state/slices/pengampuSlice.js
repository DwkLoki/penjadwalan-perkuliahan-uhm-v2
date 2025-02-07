import { createSlice } from "@reduxjs/toolkit";

const pengampuSlice = createSlice({
    name: 'pengampu',
    initialState: JSON.parse(localStorage.getItem('pengampu')) || [],
    reducers: {}
})

export default pengampuSlice.reducer