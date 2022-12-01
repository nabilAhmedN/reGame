import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllBuyer = () => {
    const { data: setBuyer = [], refetch } = useQuery({
        queryKey: ["allrole"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allrole?role=Buyer`);
            const data = await res.json();
            return data;
        },
    });

    const handleDelete = (id) => {
        const proceed = window.confirm(
            "Are you sure? you want to delete this Buyer!"
        );
        if (proceed) {
            fetch(`http://localhost:5000/deleteuser/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success("Successfully Adertise");
                        refetch();
                    }
                });
        }
    }; 

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {setBuyer.map((Seller, index) => (
                            <tr key={Seller._id}>
                                <th>{index + 1}</th>
                                <td>{Seller.name}</td>
                                <td>{Seller.email}</td>
                                <td>
                                    <button
                                        className="btn btn-xs text-red-400"
                                        onClick={() => handleDelete(Seller._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;
