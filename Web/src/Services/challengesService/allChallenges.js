export const fetchAllChallenges = (setChallengesData)=>{
    fetch("http://localhost:5000/getChallenges/challenge")
      .then((res) => res.json())
      .then((data) => setChallengesData(data))
      .catch((error) => console.error(error))
      
    
  }