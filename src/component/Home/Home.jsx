import React, { useEffect, useState } from 'react';
import producerAPI from '../API/producer'
import Slider from './Sliders'
import InfiniteScroll from 'react-infinite-scroll-component';

function Home(props) {
    const [producer, setProducer] = useState([])

    useEffect(() => {
        const fetchAllData = async () => {
            const res = await producerAPI.getAPI()
            setProducer(res)
        }

        fetchAllData()
    }, [])


    return (
        <div className="container">
            <div className="slider-with-banner">

                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div>
                            <div className="carousel-inner">
                                <div className="single-slide align-center-left animation-style-01 bg-1"
                                    style={{ backgroundImage: `url(https://cdn.shopify.com/s/files/1/2598/6284/files/3rd_Banner_5_1600x.jpg?v=1593522251)` }}>
                                    <div className="slider-progress"></div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                        <div className="li-banner">
                            <a href="#">
                                <img src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-fashion_113854663.jpg" alt="" />
                            </a>
                        </div>
                        <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
                            <a href="#">
                                <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/114148366/original/624c3d3004215425a321fa7378f0228beb349e65/do-shopify-store-banner-header-and-slider-image-design-1906.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Slider producer="Sale" id="" />

            <div className="li-static-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 text-center">
                            <div className="single-banner">
                                <img src="https://image.freepik.com/free-vector/fashion-banner-design-with-shirt-bag-camera-case_83728-1865.jpg" alt="Li's Static Banner" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <img src="https://image.freepik.com/free-vector/fashion-sale-banner-collection_23-2148161688.jpg" alt="Li's Static Banner" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <img src="https://image.freepik.com/free-vector/fashion-sale-banners_52683-11557.jpg" alt="Li's Static Banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                producer && producer.map((item, index) =>
                (
                    <Slider producer={item.producer} key={index._id} id={item._id} />
                ))
            }

        </div >

    );
}

export default Home;