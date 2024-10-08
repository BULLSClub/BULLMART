import ArticleCard from "../../components/common/Help/ArticleCard";
import HelpCategoryCard from "../../components/common/Help/HelpCategoryCard";
import HelpPageHeader from "../../components/common/Help/HelpPageHeader";

const Articles = [
    {
        "id":1,
        "title":"How can I create an NFT with Bullsclub?",
        "link":""
    },
    {
        "id":2,
        "title":"What is NFT (Non-Fungible Token)?",
        "link":""
    },
    {
        "id":3,
        "title":"What is Blockchain and how does it work?",
        "link":""
    },
    {
        "id":4,
        "title":"How do Auctions work for your NFT Hub?",
        "link":""
    },
    {
        "id":5,
        "title":"How to buy an NFT?",
        "link":""
    },
    {
        "id":6,
        "title":"How to sell my NFT?",
        "link":""
    }
];

const HelpCategory = [
    {
        "id":1,
        "title":"NFT 101",
        "question":"How can I mint my artwork & Turn into a NFT?",
        "link":""
    },
    {
        "id":2,
        "title":"DeFi 101",
        "question":"Learn all about DeFi (Decentralized Finance)",
        "link":""
    },
    {
        "id":3,
        "title":"Blockchain 101",
        "question":"Let's learn Blockchain Technology from scratch",
        "link":""
    },
    {
        "id":4,
        "title":"Creator Guide",
        "question":"FAQs related to becoming a Creator on Bullsclub",
        "link":""
    },
    {
        "id":5,
        "title":"Collector Guide",
        "question":"FAQs related to becoming a Collector on Bullsclub",
        "link":""
    },
    {
        "id":6,
        "title":"Copyright",
        "question":" frequently asked question related to Copyright",
        "link":""
    },
    {
        "id":7,
        "title":"Wallet",
        "question":"What is Crypto Wallet? How Can I Create a crypto wallet?",
        "link":""
    },
    {
        "id":8,
        "title":"Currency",
        "question":"How many Crypto Currencies is allowed in Bullsclub?",
        "link":""
    },
    {
        "id":9,
        "title":"Support",
        "question":"How can I get Support From Bullsclub Marketplace?",
        "link":""
    }
];
const Help = () => {
    return(
        <div>
        <HelpPageHeader />
        <section className="fra-section padding-top padding-bottom">
            <div className="container">
                <div className="section-header justify-content-center">
                    <div className="text-center">
                        <h3>Frequently Read Articles</h3>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="row g-3">
                        {
                            Articles.map((item) => (
                                <ArticleCard item={item} key={item.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
        <section className="help-section padding-bottom">
            <div className="container">
                <div className="section-header justify-content-center mb-70">
                    <div className="text-center">
                        <h3>Get Help By Category</h3>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="row justify-content-center gy-5 gx-4">
                        {
                            HelpCategory.map((item) =>(
                                <HelpCategoryCard item={item} key={item.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>  
    </div>
    )
}

export default Help;