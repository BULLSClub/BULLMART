import Collector from '../common/Collection/Collector';
import User from '../../data/User/Users.json';
import Link from 'next/link';
import { Container } from '@nextui-org/react';


var TopCollector = User.slice(0,9);
const TopCollectors = () => {
  return (
    <div>
    <section className="seller-section pb-100">
<div className="container">


<Container>
            <div className="section-header">
                <h3 className="header-title">Collectors</h3>
                <div className="header-content">
                    <Link href="/allauthors" className="default-btn style-2 small-btn move-right">
                    <span>View All
                            <i className="icofont-circled-right"></i></span> 
                    </Link>
                    </div>
            </div></Container>
    <div className="section-wrapper">
        <div className="seller-wrapper">
            <div className="row g-3">
                {
                    TopCollector.map((item,i=1) =>(
                        <Collector key={item.id} data={item} count={i} />
                        
                    ))
                }  
            </div>
            
        </div>
    </div>
</div>
</section>
</div>
  )
}

export default TopCollectors