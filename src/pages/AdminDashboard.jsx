import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useToast } from '../context/ToastContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalUsers: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setOrders(data);
                    const sales = data.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);
                    setStats({
                        totalSales: sales,
                        totalOrders: data.length,
                        totalUsers: 0 // Fetch users separately if needed
                    });
                } else {
                    showToast(data.message || 'Failed to fetch orders', 'error');
                }
            } catch (err) {
                showToast('Error connecting to server', 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [navigate, userInfo, showToast]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (isLoading) {
        return <div className="admin-loading">Loading Command Center...</div>;
    }

    return (
        <div className="admin-dashboard noir-admin">
            <div className="admin-container">
                <header className="admin-header">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        Command Center
                    </motion.h1>
                    <div className="admin-user-info">
                        <span>Welcome, Admin {userInfo.name}</span>
                    </div>
                </header>

                <motion.div
                    className="stats-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="stat-card" variants={itemVariants}>
                        <span className="stat-label">Total Revenue</span>
                        <span className="stat-value">${stats.totalSales.toFixed(2)}</span>
                    </motion.div>
                    <motion.div className="stat-card" variants={itemVariants}>
                        <span className="stat-label">Total Orders</span>
                        <span className="stat-value">{stats.totalOrders}</span>
                    </motion.div>
                    <motion.div className="stat-card" variants={itemVariants}>
                        <span className="stat-label">Active Users</span>
                        <span className="stat-value">--</span>
                    </motion.div>
                </motion.div>

                <section className="admin-section">
                    <div className="section-header">
                        <h2>Recent Orders</h2>
                        <Link to="/admin/orders" className="text-link">View All</Link>
                    </div>

                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id.substring(0, 10)}...</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {order.isPaid ? (
                                                <span className="status-pill success">{new Date(order.paidAt).toLocaleDateString()}</span>
                                            ) : (
                                                <span className="status-pill danger">No</span>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                <span className="status-pill success">{new Date(order.deliveredAt).toLocaleDateString()}</span>
                                            ) : (
                                                <span className="status-pill warning">No</span>
                                            )}
                                        </td>
                                        <td>
                                            <button className="table-btn" onClick={() => navigate(`/order/${order._id}`)}>Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
