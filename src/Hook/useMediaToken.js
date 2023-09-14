import { useEffect, useState } from "react";

const useMediaToken = email => {
    const [socialMediaToken, setSocialMediaToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if(data.accessToken){
                        localStorage.setItem('as12tc-token', data.accessToken)
                        setSocialMediaToken(data.accessToken)
                    }   
                })
        }
    }, [email])
    return [socialMediaToken];
}

export default useMediaToken;