//export const fetchHabits = async () => {
  // const response = await fetch("http://localhost:3001/habits");
   //return response.json(); 
//}

export const fetchHabits = async () => {
    try {
        const response = await fetch("http://localhost:3001/habits");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}
fetchHabits();
