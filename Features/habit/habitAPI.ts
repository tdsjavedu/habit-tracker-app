//export const fetchHabits = async () => {
  // const response = await fetch("http://localhost:3001/habits");
   //return response.json(); 
//}

import type { Habit } from '@/Features/habit/habitSlice.ts';

export const fetchHabits = async (): Promise<Habit[]> => {
   
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
        const response = await fetch("https://habits-tracker-backend-seven.vercel.app/habits", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch habits");
        }
        
        return response.json();
       
};


export const fetchAddHabit = async ( title:string, description:string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await fetch("https://habits-tracker-backend-seven.vercel.app/habits", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch habit");
    }
    
    return response.json();
   
};


