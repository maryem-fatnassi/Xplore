// fetch 4 data
export const fetchPlaces = (setPlaceData)=>{
    fetch("http://localhost:5000/fetchPlaces/place")
      .then((res) => res.json())
      .then((data) => setPlaceData(data.slice(0,4)))
      .catch((error) => console.error(error))
  }

// fetch all data
// export const fetchAllPlaces = (setAllPlaces)=>{
//     fetch("http://localhost:5000/fetchPlaces/place")
//       .then((res) => res.json())
//       .then((data) => setAllPlaces(data))
//       .catch((error) => console.error(error))
// }
