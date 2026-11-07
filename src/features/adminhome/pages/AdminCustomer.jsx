import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/adminServices';

function AdminCustomer() {
    let [users, setUsers] = useState([]);

    const getuser = async () => {
        try {
            let response = await getUsers();
            console.log(response);
            if (response.message === "success") {
                setUsers(response.user); // Assuming response.user is an array of users
            }
        } catch (e) {
            console.log('error :', e);
        }
    };

    useEffect(() => {
        getuser();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Total Users: {users.length}
                    </span>
                </div>

                {/* Responsive Table Container */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                            <tr>
                                <th scope="col" className="px-6 py-4">Name</th>
                                <th scope="col" className="px-6 py-4">Email</th>
                                <th scope="col" className="px-6 py-4">Contact</th>
                                <th scope="col" className="px-6 py-4">Address</th>
                                <th scope="col" className="px-6 py-4">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                            {users.length > 0 ? (
                                users.map((u) => (
                                    <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                        {/* Name Row */}
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {u.name}
                                        </td>
                                        {/* Email Row */}
                                        <td className="px-6 py-4 font-mono text-xs text-gray-600">
                                            {u.email}
                                        </td>
                                        {/* Contact Row */}
                                        <td className="px-6 py-4">
                                            {u.contact}
                                        </td>
                                        {/* Address Row */}
                                        <td className="px-6 py-4 capitalize">
                                            {u.address}
                                        </td>
                                        {/* Role Badge Row */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                                                u.role === 'admin' 
                                                ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                                                : 'bg-green-50 text-green-700 border border-green-200'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminCustomer;
