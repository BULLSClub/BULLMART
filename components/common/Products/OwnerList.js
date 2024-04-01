import Link from 'next/link';

const OwnerList = ({data}) => {
    return (
      <li className="single-author d-flex align-items-center">
        <Link href="" className={`${data.verified ? "veryfied" : ""}`}>
          <img src={`${data.image}`} alt="author-img" />
        </Link>
        <h6>
          <Link href="">
            {`${data.name}`}
          </Link>
        </h6>
      </li>
    );
    };
    
    export default OwnerList;