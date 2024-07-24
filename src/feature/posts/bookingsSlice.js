import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://e277f591-6760-447b-b137-99725c71adc1-00-39jx7cm5ymyzf.kirk.replit.dev";

// Asyncthunk for fetching user's bookings
export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchByUser",
    async (userId) => {
        const response = await axios.get(`${BASE_URL}/bookings/user/${userId}`);
        return response.data;
    }
);

export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async ({ name, email, phone, service, date, time }) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            content: {
                name,
                email,
                phone,
                service,
                date,
                time,
                user_id: userId,
            },
        };

        const response = await axios.post(`${BASE_URL}/bookings`, data);
        return response.data;
    }
);


export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async ({ id, newBookingDate, newBookingTime, newBookingService }) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            service: newBookingService,
            date: newBookingDate,
            time: newBookingTime,
            user_id: userId,
        };

        const response = await axios.put(`${BASE_URL}/bookings/${id}`, data);
        return response.data;
    }
);

export const deleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (id) => {
        await axios.delete(`${BASE_URL}/bookings/${id}`);
        return id;
    }
);

export const bookingsSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        });
        builder.addCase(saveBooking.fulfilled, (state, action) => {
            state.bookings.push(action.payload);
        });
        builder.addCase(updateBooking.fulfilled, (state, action) => {
            const updatedBooking = action.payload;
            const index = state.bookings.findIndex(booking => booking.id === updatedBooking.id);
            if (index !== -1) {
                state.bookings[index] = updatedBooking;
            }
        });
        builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        });
    },
});

export default bookingsSlice.reducer;
