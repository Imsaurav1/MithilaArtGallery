import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
const fet = process.env.REACT_APP_ORDER_DATA;

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const storedData = localStorage.getItem('data');
        if (!storedData) {
            console.error('User data not found in localStorage');
            return;
        }

        const { email } = JSON.parse(storedData);
        if (!email) {
            console.error('User email not found in localStorage');
            return;
        }

        try {
            console.log("Sending request with email:", email); // Log the email being sent
            const response = await fetch(fet, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched order data:', data); // Log the fetched data
                setOrderData(data.orderData);
            } else {
                console.error('Failed to fetch orders:', response.status, await response.text());
            }
        } catch (error) {
            console.error('An error occurred while fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.length > 0 ? (
                        orderData
                            .slice(0)
                            .reverse()
                            .map((order, index) => (
                                <React.Fragment key={index}>
                                    <div className='m-auto mt-5'>
                                        {order.Order_date ? (
                                            <>
                                                <div>{order.Order_date}</div>
                                                <hr />
                                            </>
                                        ) : null}
                                    </div>
                                    {order.items.map((item) => (
                                        <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img
                                                    src={item.img}
                                                    className="card-img-top"
                                                    alt="..."
                                                    style={{ height: "120px", objectFit: "fill" }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))
                    ) : (
                        <div>No orders found.</div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
