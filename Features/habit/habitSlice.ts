import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { fetchHabits, fetchAddHabit } from "./habitAPI";

export type Habit = {
    _id: string;
    id: string;
    title: string;
    description: string;
    createdAt: string;
    days:number
    lastDone: Date;
    lastUpdate: Date;   
    startedAt: Date; 
}
type markAsDoneThunkParams = {
    habitId: string;
    token: string;
}
type addHabitThunkParams = {
    title: string;
    description: string;
    token: string;
}

export type HabitState = {
    habits: Habit[];
    status: Record<string, "idle" | "loading" | "success" | "failed">;
    error: Record<string, string | null>;
}

const initialState: HabitState = {
    habits: [],
    status: {},
    error: {}
}
export const fetchHabitsThunk = createAsyncThunk("habit/fetchHabits", async (token:string, {rejectWithValue}) => {
   
   try{
    const data = await fetchHabits();
    return data;
   }catch (error) {
        return rejectWithValue("Failed to fetch habits");
    }

   
   
   
    //const response = await fetchHabits(token);
    //const responseJson = await response.json();
    //if (!response.ok) {
      //  return rejectWithValue("Failed to fetch habits");
    //}
    //return responseJson;
});

export const markAsDoneThunk = createAsyncThunk("habit/markAsDone", async ({habitId,token}:markAsDoneThunkParams, {rejectWithValue}) => {

    
    const response = await fetch(`https://habits-tracker-backend-seven.vercel.app/habits/markasdone/${habitId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to mark habit as done");
    }else if (responseJson.message.toString() === "Habit Restarted"){
        return rejectWithValue(responseJson.message);
    }else{
        return responseJson.message;
    }
    
});

export const fetchAddHabitThunk = createAsyncThunk("habit/fetchAddHabit", async ({title, description}:addHabitThunkParams, {rejectWithValue}) => {
    const response = await fetchAddHabit( title, description);
    const responseJson = await response.json();
    
    if (!response.ok) {
     return rejectWithValue("Failed to add habit");
    }else if (responseJson.message.toString() === "Error creating habit"){
        return rejectWithValue(responseJson.message);
    }else{
        return responseJson.token;
    }

});

const habitSlice = createSlice({
    name: "habit",
    initialState,
    reducers: {
        addHabits: (state, action) => {
            state.habits = action.payload;  
        },
        addHabit: (state, action) => {
            state.habits.push(action.payload);
        },
        removeHabit: (state, action) => {
            state.habits = state.habits.filter(habit => habit.id !== action.payload);
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        }).addCase(markAsDoneThunk.fulfilled, (state, action) => {
            state.status[action.meta.arg.habitId] = "success";
            state.error[action.meta.arg.habitId] = null;
        }).addCase(markAsDoneThunk.rejected, (state, action) => {
            state.status[action.meta.arg.habitId] = "failed";
            state.error[action.meta.arg.habitId] = action.payload as string;
        }).addCase(fetchAddHabitThunk.fulfilled, (state, action) => {
            state.habits.push(action.payload);
    });
}
});

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;