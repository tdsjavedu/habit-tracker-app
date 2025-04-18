import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchRegisterUser, fetchLoginUser } from './userAPI';

interface userThunk {
    username: string;
    password: string;
}

type user = {
    token: string;
}
type userState = {
    user: user | null;
    status: 'idle' | 'success' | 'loading' | 'failed';
    error: string | null;
}
const initialState: userState ={
    user: null,
    status: 'success',
    error: null,    
}
export const fetchRegisterUserThunk = createAsyncThunk("user/fetchRegisterUser", async ({username, password}: userThunk, {rejectWithValue}) => {
   try {
     const response = await fetchRegisterUser(username, password);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to register user");
    }
        return responseJson.message;
    } catch (error) {
        return rejectWithValue("Failed to register user");
    }

});
export const fetchLoginUserThunk = createAsyncThunk("user/fetchLoginUser", async ({username, password}:userThunk, {rejectWithValue}) => {
    try {
        const response = await fetchLoginUser(username, password);
       // const responseJson = await response.json();
        return response;
    } catch (error) {
        return rejectWithValue("Failed to login user");
    }

});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchRegisterUserThunk.fulfilled, (state, action) => {
            state.status = "success";
            state.error = action.payload as string;
            alert ("Usuario registrado correctamente");
    });
    
    builder.addCase(fetchRegisterUserThunk.rejected, (state, action) => {
            state.status = "failed";
            state.user = null;
            state.error = action.payload as string;
            alert ("Error al registrar el usuario");

    });
    builder.addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.user = {token: action.payload.token};
        state.error = null;
        localStorage.setItem("habitToken", action.payload.token);
        alert (action.payload.message);  
    
    }); 
    builder.addCase(fetchLoginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload as string;
        alert ("No es posible iniciar sesion en este momento");    
    })
    }
});
export const {addUser} = userSlice.actions;
export default userSlice.reducer;
    
