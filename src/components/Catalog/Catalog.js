import React, {Component}from 'react';

class Catalog extends Component{

    render(){
        return(
            <main className='site-content user'>
            <section className="site-index">
                <h1>Dogs available for adoption</h1>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/basenji/n02110806_5642.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Harry</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/papillon/n02086910_2188.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Rusty</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/affenpinscher/n02110627_1446.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Nina</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/clumber/n02101556_438.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Cara</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/shihtzu/n02086240_6323.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Fuji</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/springer-english/n02102040_1976.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Lulu</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/dachshund/dachshund-5.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Timmy</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/greyhound-italian/n02091032_1170.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Robin</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
                <div className="card">
                    <div className="media">
                        <img src="https://images.dog.ceo/breeds/mix/IMG_2840.jpg" alt="Dog"/>
                    </div>
                    <div className="content">
                        <h3>Hello, my name is Misty</h3>
                        <a href="details.html" className="button button-revelse">Details</a>
                    </div>
                </div>
            </section>
        </main>
        );
    }
}

export default Catalog;
