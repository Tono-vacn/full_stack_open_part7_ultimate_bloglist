import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
const initialState = []
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        initializeUsers(state,action) {
            return action.payload
        }
    }
})

export const { initializeUsers } = usersSlice.actions
export const initializeUsersFromServer = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(initializeUsers(users))
    }
}
export default usersSlice.reducer