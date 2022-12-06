const { createSlice } = require('@reduxjs/toolkit');

const initialState = { users: [], user: {} };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            console.log('setUser');
            state.user = payload.user;
        },
        logout: (state) => initialState,
    },
});

export const userReducer = userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
