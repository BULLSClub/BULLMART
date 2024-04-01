import Link from 'next/link';

const ArticleCard = ({item}) =>{
    return (
        <div className="col-lg-4 col-sm-6">
            <Link href="/helpsingle/helpsingle" className="help-item">
                {`${item.title}`}
            </Link>
        </div>
    );
}

export default ArticleCard;