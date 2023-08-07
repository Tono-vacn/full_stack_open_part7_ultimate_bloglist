import { createSlice } from '@reduxjs/toolkit'
const initialState = ''
const flagSlice = createSlice({
    name: 'flag',
    initialState,
    reducers: {
        createFlag(state,action) {
            return action.payload
        },
        removeFlag() {
            return ''
        }
    }
})

export const { createFlag, removeFlag } = flagSlice.actions
export const setFlag = (flag,seconds) => {
    return async dispatch => {
        dispatch(createFlag(flag))
        setTimeout(() => {
            dispatch(removeFlag())
        },seconds*1000)
    }
}
export default flagSlice.reducer