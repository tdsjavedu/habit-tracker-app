import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import habitReducer from "../Features/habit/habitSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            habits: habitReducer,
        },
    });
};  

//const rootReducer = combineReducers({
//    habits: habitReducer,
//});

//export type RootState = ReturnType<typeof rootReducer>;
//const store = configureStore({
//    reducer: rootReducer,
//});

//export type AppDispatch = typeof store.dispatch;


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

//export default store;