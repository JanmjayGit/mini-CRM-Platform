
import React, { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "../services/api";
import "./CustomerList.css"; // Assuming you have a CSS file for styling

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await getCustomers();
            setCustomers(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch customers");
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCustomer(newCustomer);
            setCustomers(prev => [...prev, response.data]);
            setNewCustomer({ name: "", email: "", phone: "", address: "" });
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create customer");
        }
    };

    if (loading) return <div className="loading">Loading customers...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="customer-list">
            <h2>Customer List</h2>
            <form className="customer-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newCustomer.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newCustomer.phone}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={newCustomer.address}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Customer</button>
            </form>

            {customers.length === 0 ? (
                <p>No customers found.</p>
            ) : (
                <ul className="customer-items">
                    {customers.map((customer) => (
                        <li key={customer.id} className="customer-item">
                            <div className="customer-info">
                                <h3>{customer.name}</h3>
                                <p>{customer.email}</p>
                                <p>{customer.phone}</p>
                                <p>{customer.address}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerList;
