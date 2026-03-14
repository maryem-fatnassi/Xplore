export const fetchPlaces = (setPlaceData)=>{
    fetch("http://localhost:5000/getChallenges/challenge")
      .then((res) => res.json())
      .then((data) => setPlaceData(data.slice(0,4)))
      .catch((error) => console.error(error))
  }