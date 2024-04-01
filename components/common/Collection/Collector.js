import Link from 'next/link';

const Collector = ({data,count,countShow=true,columnSize = "col-xl-4 col-lg-6"}) => {
    return (
        <div className={columnSize}>
            <div className="seller-item ">
                <div className="seller-inner align-items-center justify-content-center">
                    <div className="seller-part">
                        <p className="assets-number">{countShow?count+1:''}</p>
                        <div className="assets-owner">
                            <div className="owner-thumb veryfied">
                                <a>
                                <img
                                        src={`${data.image}`} alt="seller-img" />
                                </a>
                            </div>
                            <div className="owner-content">
                                <h6>
                                <a>
                                    {`${data.name}`}
                                </a> 
                                </h6> 
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default Collector