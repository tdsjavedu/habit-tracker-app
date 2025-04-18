import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import habitReducer from "../Features/habit/habitSlice";
import userReducer from "../Features/habit/user/userSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            habits: habitReducer,
            user: userReducer,
        },
    });
};  

//const rootReducer = combineReducers({
 //   habits: habitReducer,
//});

//export type RootState = ReturnType<typeof rootReducer>;
//const store = configureStore({
 //   reducer: rootReducer,
//});

//export type AppDispatch = typeof store.dispatch;


//export type AppStore = ReturnType<typeof makeStore>;
//export type AppState = ReturnType<AppStore["getState"]>;
// Removed duplicate AppDispatch declaration


//export default store;

const store = configureStore({
    reducer: {
        habits: habitReducer,
        user: userReducer,
    },  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export default store;

