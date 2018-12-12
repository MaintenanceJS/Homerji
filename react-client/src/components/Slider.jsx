import React from 'react';



class Slider extends React.Component {
    render() {

        return (

            <div>
                <div id="myCarousel" className="carousel slide">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="https://www.atclandscape.com/wp-content/uploads/2017/07/Commercial-Pic-1-1500x500.jpg" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>HOMERJI Is Here To Help</h1>
                                    <pthis is="" an="" example="" layout="" with="" carousel="" that="" uses="" the="" bootstrap=" 3= styles.<=" small=""><p></p>
                                    </pthis></div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="https://electricians.quotatis.co.uk/wp-content/uploads/sites/7/2017/09/1500x500-electricians4.jpg" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Find The Best Services Around</h1>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <img src="https://plumbing.quotatis.co.uk/wp-content/uploads/sites/34/2017/09/plumbing.jpg" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Easy and Fast</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="icon-prev"></span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="icon-next"></span>
                    </a>
                </div>



            </div>


        )
    }
}

export default Slider;