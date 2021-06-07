import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
// import HistoryAPI from '../../API/HistoryAPI';
import './History.css'
import OrderAPI from '../API/order';
import Detail_OrderAPI from '../API/detailOrder';


function DetailHistory(props) {

    const { id } = useParams()

    const [order, set_order] = useState({})

    const [detail_order, set_detail_order] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await OrderAPI.get_detail(id)

            set_order(response)

            const response_detail_order = await Detail_OrderAPI.get_detail_order(id)

            set_detail_order(response_detail_order)

        }

        fetchData()

    }, [])

    return (
        <div>
            <div className="container" style={{ paddingTop: '3rem' }}>
                <h1>Thông Tin Chi Tiết Đơn Hàng</h1>
                <ul>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>ID: <span style={{ fontWeight: 'lighter' }}>{order._id}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Ngày đặt: <span style={{ fontWeight: 'lighter' }}>
                        {order.createDate && new Intl.DateTimeFormat("it-IT", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric"
                        }).format(new Date(order.createDate))}</span>
                    </li>

                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>SĐT: <span style={{ fontWeight: 'lighter' }}>{order.id_note && order.id_note.phone}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Địa chỉ: <span style={{ fontWeight: 'lighter' }}>{order.address}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Tên: <span style={{ fontWeight: 'lighter' }}>{order.id_note && order.id_note.fullname}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Tổng tiền: <span style={{ fontWeight: 'lighter' }}>{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(order.total) + ' VNĐ'}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Feeship: <span style={{ fontWeight: 'lighter' }}>{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(order.feeship) + ' VNĐ'}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Phương thức thanh toán: <span style={{ fontWeight: 'lighter' }}>{order.id_payment && order.id_payment.pay_name}</span></li>
                    <li style={{ fontSize: '1.1rem', fontWeight: 'bolder' }}>Tình trạng thanh toán: <span style={{ fontWeight: 'lighter' }}>{order.pay ? 'Đã thanh toán' : 'Chưa thanh toán'}</span></li>
                </ul>
                <div className="group_box_status" style={{ marginTop: '3rem' }}>
                    <div className="d-flex justify-content-center">
                        <div className="group_status_delivery d-flex justify-content-around">
                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.status > 0 && order.status < 5 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đang xử lý</a>
                            </div>

                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.status > 1 && order.status < 5 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đã xác nhận</a>
                            </div>

                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.status > 2 && order.status < 5 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Đang giao</a>
                            </div>

                            <div className="detail_status_delivery">
                                <div className="w-100 d-flex justify-content-center">
                                    <div className={order.status > 3 && order.status < 5 ? 'bg_status_delivery_active' : 'bg_status_delivery'}></div>
                                </div>
                                <a className="a_status_delivery">Hoàn tất</a>
                            </div>
                        </div>
                    </div>
                    <div className="test_status d-flex justify-content-center">
                        <div className="hr_status_delivery"></div>
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
                                                <th className="li-product-remove">Image</th>
                                                <th className="li-product-thumbnail">Name Product</th>
                                                <th className="cart-product-name">Price</th>
                                                <th className="li-product-price">Count</th>
                                                <th className="li-product-price">Total money</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detail_order && detail_order.map(value => (
                                                    <tr key={value._id}>
                                                        <td className="li-product-thumbnail"><img src={"http://localhost:8000/" + value.id_product.image} style={{ width: '5rem' }} alt="Li's Product Image" /></td>
                                                        <td className="li-product-name"><Link to={"/detail/" + value.id_product._id}>{value.name_product}</Link></td>
                                                        <td className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(value.price_product) + ' VNĐ'}</span></td>
                                                        <td className="li-product-price"><span className="amount">{value.count}</span></td>
                                                        <td className="li-product-price"><span className="amount">{new Intl.NumberFormat('vi-VN', { style: 'decimal', decimal: 'VND' }).format(Number(value.price_product) * value.count) + ' VNĐ'}</span></td>
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

export default DetailHistory;