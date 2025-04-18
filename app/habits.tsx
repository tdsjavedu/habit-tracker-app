import { useSelector, useDispatch } from "react-redux";
import { markAsDoneThunk, fetchAddHabitThunk } from "@/Features/habit/habitSlice";

import {AppState, AppDispatch} from "../Redux/store";
import {fetchHabitsThunk} from "@/Features/habit/habitSlice";
import { useEffect, useState } from "react";


type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days:number
    lastDone: Date;
    lastUpdate: Date;
    startedAt: Date;
}

type HabitsProps = {
    habits: Habit[];
}
type HabitState = {
    habits: Habit[];

}

const handleMarkAsDone = (dispatch: AppDispatch, habitId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    dispatch(markAsDoneThunk({habitId, token}));
};

 //const handleMarkAsDone = (dispatch: AppDispatch, habitId: string, token: string) => {
   // dispatch(markAsDoneThunk({habitId, token}));
   // if(token){
   //         dispatch(fetchHabitsThunk(token));
//}
// }
export default function Habits({habits}: HabitState) {
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: AppState) => state.user.user?.token);
    const status = useSelector((state: AppState) => state.habits.status);
    const error = useSelector((state: AppState) => state.habits.error);
    const user = useSelector((state: AppState) => state.user.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (token) {
            dispatch(fetchHabitsThunk(token));  
        }
    }, [dispatch, token]);

    const calculateProgress = (days:number):number => {
        return Math.min((days/66)*100, 100);
    };
 
    const handleAddHabit = () => {
        if( title && description){
            dispatch(fetchAddHabitThunk({token:user?user.toString():'', title, description}));
            setTitle("");
            setDescription("");
            dispatch(fetchHabitsThunk(user?user.toString() : ''))
    }
    };
    return (

        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-bold mb-4 text-black">Habits</h1>
            <ul className="space-y-4">
            {habits.length > 0 ? (
                habits.map((habit:Habit) => (
                     <li className="flex items-center justify-between" key={habit._id}>
                        <span className="text-black">{habit.title}</span>
                        <div className="flex items-center space-x-2">                      
                            <progress className="w-24" value={calculateProgress(habit.days)} max="100">  </progress>
                            <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded" onClick={()=> handleMarkAsDone(dispatch, habit._id)}>{status[habit._id]==="loading" ? "Processing" : "Mark as Done"}</button>
                            {status[habit._id]==="failed" && <span className="text-red-500">{error[habit._id]}</span>}  
                            {status[habit._id]==="success" && <span className="text-green-500">Already marked as done</span>}
                        </div>

                    </li>

                ))
            ) : (
                <li className="text-gray-500">No habits Available.</li>
            )}
            </ul>

        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Add Habit</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
/>

            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
/>
            </div>
            <button
                onClick={handleAddHabit}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add
            </button>
        </div>
        </div>
    );

}