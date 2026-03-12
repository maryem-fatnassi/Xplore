export async function login(form){
    const res = await fetch("http://localhost:5000/api/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
        });
        if(!res.ok){
            const errorData = await res.json()
            throw {res:{data : errorData}}
        }

// const data = await res.json()
return res.json()
}