import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import OrderAPI from '../API/order';
import { AuthContext } from '../context/AuthContext'

MainHistory.propTypes = {

};

function MainHistory(props) {
    const { user } = useContext(AuthContext);
    const [history, set_history] = useState([])

    if (!user) {
        props.history.push('/login')
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await OrderAPI.get_order(user._id)
            set_history(response)

        }
        if (user) {
            fetchData()

        }
    }, [])

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">History</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="Shopping-cart-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form action="#">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="li-product-remove">ID</th>
                                                <th className="li-product-remove">Ngày đặt</th>
                                                <th className="cart-product-name">SĐT</th>
                                                <th className="li-product-price">Địa chỉ</th>
                                                <th className="li-product-quantity">Tổng tiền</th>
                                                <th className="li-product-subtotal">Thanh toán</th>
                                                <th className="li-product-subtotal">Tình trạng thanh toán</th>
                                                <th className="li-product-subtotal">Tình trạng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history && history.map(value => (
                                                    <tr key={value._id}>
                                                        <td className="li-product-price"><span className="amount"><Link to={`/order/${value._id}`}>View</Link></span></td>

                                                        <td className="li-product-price">
                                                            <span className="amount">
                                                                {new Intl.DateTimeFormat("it-IT", {
                                                                    year: "numeric",
                                                                    month: "numeric",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    second: "numeric"
                                                                }).format(new Date(value.createDate))}
                                                            </span></td>

                                                        <td className="li-product-price"><span className="amount">{value.id_note.phone}</span></td>
                                                        <td className="li-product-price"><p className="amount address">{value.address}</p></td>
                                                        <td className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(value.total) + ' VNĐ'}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.id_payment.pay_name}</span></td>
                                                        <td className="li-product-price"><span className="amount" style={value.pay ? { color: 'green' } : { color: 'red' }}>{value.pay ? 'Đã thanh toán' : 'Chưa thanh toán'}</span></td>
                                                        <td className="li-product-price"><span className="amount">
                                                            {
                                                                value.status === '1' ? 'Đang xử lý' :
                                                                    (value.status === '2' ? 'Đã xác nhận' :
                                                                        (value.status === '3' ? 'Đang giao' :
                                                                            (value.status === '4' ? 'Hoàn tất' : 'Đơn bị hủy')))}
                                                        </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainHistory;