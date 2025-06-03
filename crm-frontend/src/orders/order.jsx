// src/pages/orders/Order.jsx
import React, { useEffect, useState } from "react";
import {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getCustomers
} from "../services/api"; // Adjust the import path as necessary

import "./order.css";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [newOrder, setNewOrder] = useState({
        customerId: "",
        amount: "",
        status: "PENDING",
        orderDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            setOrders(response.data);
        } catch (err) {
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await getCustomers();
            setCustomers(response.data);
        } catch (err) {
            setError("Failed to fetch customers");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                customer: { id: newOrder.customerId },
                amount: parseFloat(newOrder.amount),
                status: newOrder.status,
                orderDate: newOrder.orderDate
            };
            const response = await createOrder(payload);
            setOrders(prev => [...prev, response.data]);
            setNewOrder({
                customerId: "",
                amount: "",
                status: "PENDING",
                orderDate: new Date().toISOString().split('T')[0]
            });
        } catch (err) {
            setError("Failed to create order");
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteOrder(orderId);
                setOrders(prev => prev.filter(o => o.id !== orderId));
            } catch (err) {
                setError("Failed to delete order");
            }
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const order = orders.find(o => o.id === orderId);
            const updated = await updateOrder(orderId, { ...order, status: newStatus });
            setOrders(prev => prev.map(o => o.id === orderId ? updated.data : o));
        } catch (err) {
            setError("Failed to update order");
        }
    };

    return (
        <div className="orders-container">
            <h2>Orders Management</h2>
            <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <select
                        name="customerId"
                        value={newOrder.customerId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="amount"
                        value={newOrder.amount}
                        onChange={handleInputChange}
                        placeholder="Order Amount"
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        name="status"
                        value={newOrder.status}
                        onChange={handleInputChange}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        name="orderDate"
                        value={newOrder.orderDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Create Order</button>
            </form>

            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <h3>Order #{order.id}</h3>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(order.id)}
                            >Delete</button>
                        </div>
                        <div className="order-details">
                            <p><strong>Customer:</strong> {order.customer?.name || "Unknown"}</p>
                            <p><strong>Amount:</strong> ${order.amount}</p>
                            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <div className="status-control">
                                <strong>Status:</strong>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={`status-${order.status.toLowerCase()}`}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PROCESSING">Processing</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Order;
