import { useEffect, useState } from "react";

const UseSeller = (email) => {
    const [seller, setSeller] = useState(false);

    const [sellerLoading, setSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/seller/${email}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setSeller(data.seller);
                    setSellerLoading(false);
                });
        }
    }, [email]);

    return [seller, sellerLoading];
};

export default UseSeller;
