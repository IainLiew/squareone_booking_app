import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://e277f591-6760-447b-b137-99725c71adc1-00-39jx7cm5ymyzf.kirk.replit.dev";
// Asyncthunk fro fetching users booking
export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/bookings/user/${userId}`);
        return response.json();
    }
);

export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async (name, email, phone, service, datetime) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            content: {
                name,
                email,
                phone,
                service,
                datetime
            },
            user_id: userId,
        };

        const response = await axios.post(`${BASE_URL}/bookings`, data);
        return response.data;
    }
);

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        }),
            builder.addCase(saveBooking.fulfilled, (state, action) => {
                state.bookings = [action.payload, ...state.bookings];
            });
    },
});

export default bookingsSlice.reducer;