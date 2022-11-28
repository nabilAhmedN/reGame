import { useEffect, useState } from "react";

const useAdmin = (email) => {
    
    const [admin , setAdmin] = useState(false);

    const [adminLoading,setAdminLoading ] = useState(true);

    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/users/admin/${email}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                setAdmin(data.admin);
                setAdminLoading(false);
            })
        }
    },[email])

    return [admin , adminLoading];

    

}


export default useAdmin;
