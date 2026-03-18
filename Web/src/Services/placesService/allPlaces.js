// fetch all data
export const fetchAllPlaces = async (setAllPlaces) => {
    console.log("Fetch function working")
  try {
    const res = await fetch("http://localhost:5000/fetchPlaces/place");
    const data = await res.json();
    console.log("API DATA:" ,data)
    setAllPlaces(data);
  } catch (error) {
    console.error(error);
  }
};