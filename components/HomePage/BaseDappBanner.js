import React from 'react'

const BaseDappBanner = () => {
  return (
    <div className="bg-white dark:bg-black">
    <section className="container rounded-[15px] items-center px-4 pb-12 mx-auto mt-20 lg:flex md:px-40" >
    <div className="flex-1 space-y-4 sm:text-center lg:text-left">
    <h1 className="text-4xl font-bold text-blue-500 text-center">
BASE-BULLZAR DAPP
</h1>

<p className="max-w-xl leading-relaxed text-black dark:text-white sm:mx-auto lg:ml-0 text-center"> 
Raise web3 fund, buy and sell BASE club NFTs, Become Royal Legacy Member, Stake and Earn BULLs-BASE & BEARS-BASE, Game and More, Check the DAPP!
</p>
<div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
<a href='https://bullzar.bullsclub.space/' target='_blank'>
            <img
                src='/base.png'
                style={{ width: '200px', height: '80px' }}
            /></a>
<p className="max-w-xl leading-relaxed text-black dark:text-white sm:mx-auto lg:ml-0">
Learn more about <span className="text-blue"><a href="https://base.org/" target="_blank">BASE</a> NETWORK</span>
</p>
  </div>
     </div>
        <div>
           
        </div>
    </section>
</div>
  )
}

export default BaseDappBanner
