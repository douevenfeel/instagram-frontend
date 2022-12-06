const { createSlice } = require('@reduxjs/toolkit');

const initialState = { users: [], user: {} };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            console.log('setUser');
            state.user = payload.user;
            localStorage.setItem('token', payload.accessToken);
        },
        setUsers: (state, { payload }) => {
            console.log('setUsers');
            state.users = payload;
        },
        resetUsers: (state) => {
            state.users = [];
        },
        logout: () => initialState,
    },
});

export const userReducer = userSlice.reducer;
export const { setUser, setUsers, logout, resetUsers } = userSlice.actions;
