import Link from 'next/link';

const HelpCategoryCard = ({item}) =>{
    return (
        <div className="col-lg-4 col-md-6">
            <Link href="/helpsingle" className="help-item style-2">
                <span>{`${item.title}`}</span>
                {`${item.question}`}
            </Link>
        </div>
    );
}

export default HelpCategoryCard;