import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Login} from '../../api/Login'

//createAsyncThunk has 2 input first name second callback
export const authAsyncThunk = createAsyncThunk(
    'auth/login',
    //authData => {username:'soheil',password:'1234'}
    async (authData) => {
        const data = await Login(authData.username, authData.password)
        return data
        //data => payload
    }
)

const initialState = {
    isLogin: false,
    loading: false,
    name: '',
    country: '',
    age: '',
    error: ''
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    //sync
    //reducers object
    reducers: {
        logout: (state) => {
            state.isLogin = false
            state.loading = false
            state.name = ''
            state.age = ''
            state.country = ''
        }
    },
    //async
    //extraReducer callback
    extraReducers: (builder) => {
        builder.addCase(authAsyncThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(authAsyncThunk.fulfilled, (state, action) => {
            //action return response
            //action object
            //payload {
            //                 name:'soheil',
            //                 age:12,
            //                 country:'iran'
            //             }
            const {payload} = action
            state.isLogin = true
            state.loading = false
            state.name = payload.name
            state.age = payload.age
            state.country = payload.country
        })
        builder.addCase(authAsyncThunk.rejected, (state, action) => {
            state.loading = false
            state.error = 'invalid password or username'
        })
    }
})

export const {logout} = AuthSlice.actions

export default AuthSlice.reducer