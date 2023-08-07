import { createSlice } from '@reduxjs/toolkit'
const initialState = ''
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state,action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export const setNotification = (notification,seconds) => {
    return async dispatch => {
        dispatch(createNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        },seconds*1000)
    }
}
export default notificationSlice.reducer