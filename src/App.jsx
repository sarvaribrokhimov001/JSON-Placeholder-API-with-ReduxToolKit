import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers, postUsers} from "./users/UsersSlice";

const App = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  const [addBtn , setAddBtn] = useState("");
  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());

    const setTime = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(setTime);
  }, []);

  if (users.Loading || loading) 
    return <h2 className="text-center font-bold mt-8 text-gray-900 text-[50px]"> Loading.... </h2>;
  if (users.Error) 
    return <h2 className="text-center text-red-600 text-shadow-red-600 text-[50px]"> {users.Error} </h2>;

  const handleAdd = () => {
  const newUser = {
    id: Date.now(),
    name: addBtn.charAt(0).toUpperCase() + addBtn.slice(1).toLowerCase(),
    phone: "+998938772249",
    email: "user@gmail.com",
    address: {
      city: "New York",
      street: "Broadway",
    },
    company: {
      name: "TechVision Inc",
    },
  };

  dispatch(postUsers(newUser));
  setAddBtn("");
};

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-[30px] bg-gray-950">
      <h2 className="text-[40px] font-black mb-6 text-white"> Users </h2>

    <div className="flex gap-5 mb-[20px] justify-center items-center">
      <input onChange={(e) => {
        setAddBtn(e.target.value);
      }} value={addBtn} 
      type="text" 
      placeholder="Add new User" 
      className="w-[220px] h-[40px] bg-gray-800 rounded-[20px] pl-[20px] focus:bg-black focus:text-red-700 capitalize font-bold text-[18px]"
      />
      <button className="w-[130px] h-[35px] rounded-[20px] bg-black text-green-600 font-bold border-[5px] 
        text-[17px] border-green-600 hover:bg-green-600 hover:text-white hover: border-[5px] hover:border-white" 
        onClick={handleAdd}> +AddBtn 
      </button>
    </div>

      <div>
         <table className="w-full border-collapse text-left text-sm text-gray-300">
            <thead className="bg-gray-800/50 text-xs uppercase tracking-wider text-gray-400">
                <tr className="transition-colors hover:bg-gray-800/30">
                    <th className="px-6 py-4 font-semibold"> T/r </th>
                    <th className="px-6 py-4 font-semibold"> Username </th>
                    <th className="px-6 py-4 font-semibold"> PhoneNumber </th>
                    <th className="px-6 py-4 font-semibold"> Email </th>
                    <th className="px-6 py-4 font-semibold"> City </th>
                    <th className="px-6 py-4 font-semibold"> Street </th>
                    <th className="px-6 py-4 font-semibold"> CompanyName </th>
                    <th className="px-6 py-4 font-semibold"> Actions </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
                {users.data?.map(({id , name , phone , email , address , company})=> (
                <tr className="transition-colors hover:bg-gray-800/30" key={id}>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {id} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {name} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {phone} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {email} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {address?.city} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {address?.street} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300"> {company?.name} </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                        <button className="w-[100px] h-[35px] rounded-[20px] bg-black text-green-600 font-bold border-[5px] text-[17px] border-green-600
                         hover:bg-green-600 hover:text-white hover: border-[5px] hover:border-white"> View </button>
                        <button className="w-[100px] h-[35px] rounded-[20px] bg-black text-yellow-400 font-bold border-[5px] text-[17px] border-yellow-400
                         hover:bg-yellow-400 hover:text-white hover:border-[5px] hover:border-white"> Edit </button>
                        <button className="w-[100px] h-[35px] rounded-[20px] bg-black text-red-600 font-bold border-[5px] text-[17px] border-red-600
                         hover:bg-red-600 hover:text-white hover:border-[5px] hover:border-white"> Delete </button>
                    </td>
                </tr>
        ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};
export default App;