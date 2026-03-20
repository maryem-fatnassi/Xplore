export const fetchPosts = async (setPosts)=>{
    try {
      const response = await fetch("http://localhost:5000/api/posts/all");
      const data = await response.json();
      setPosts(data.slice(0,3));
    } catch (error) {
        console.log(error)
    }
}