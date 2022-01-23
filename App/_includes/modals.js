import { Fragment, useRef, useState , useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import HelixWrapper from '@hooks/baseLayerHooks';
import { notify } from 'reapop';
import { BN } from '@project-serum/anchor';

export function MintModal(props) {
  const [open, setOpen] = useState(false);

  const {
    helixClient,
		createBondAccount,
		solBond,
		splBond,
		// redeemBonds,
		// collectCoupon,
    getTokenAccountBalance,
		getSolBalance,
    getBondMarketInfo,
	} = HelixWrapper();

  const [bondMarket, setBondMarket] = useState();

  useEffect(async ()=>{
    let market_raw = await getBondMarketInfo(props.bondAddr);
    if(market_raw != undefined){
      let market_parsed = {
        couponRates: market_raw.couponRates.map((x)=>{return x.toNumber()}),
        interestRate: market_raw.interestRate.toNumber(),
        mint: market_raw.mint.toString(),
      };
      setBondMarket(market_parsed);
    }
  }, [helixClient]);


  /// asset balance
  const [userAssetBalance, setUserAssetBalance] = useState(0);
  
  useEffect(async ()=>{
    if ( helixClient != undefined ){
      let val = props.bondName == "SOL" ? getSolBalance() : getTokenAccountBalance(props.bondAddr);
      setUserAssetBalance(await val);
    }    
  },[helixClient])

  /// how much user wants to receive
  const [redemptionValue, setRedemptionValue] = useState(0);

  /// maturity in weeks
  const [maturity, setMaturity] = useState(0);

  /// sum of coupon payments
  const [couponTotal, setCouponTotal] = useState(0);
  
  // (face value / (interest rate ^ maturity) ) + sum[coupons]
  const [dueAmount, setDueAmount] = useState(0);

  const [presentValue, setPresentValue] = useState(0);

  function updateAmounts(red_in, maturity_in){
    if (bondMarket != undefined){
      let sum = 0;
      let couponAmt = (bondMarket.couponRates[maturity_in]/1000) * red_in;
      for(let i = 1; i <= maturity_in; i++){
        sum += couponAmt/Math.pow(1+(bondMarket.interestRate/1000), i)
      };
      setCouponTotal(sum);
      let pv = red_in / Math.pow(1+(bondMarket.interestRate/1000), maturity_in);
      setPresentValue(pv);
      let dAmt = pv + sum;
      setDueAmount(dAmt);
    }
  }
  
  const cancelButtonRef = useRef(null);
  
  // what the fuck is this ??????
  const hasAccount = true;

  return (
	<>
	<button className="btn btn-primary" onClick={() => setOpen(true)}>Mint</button>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom content-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white content-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-gray-500 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg text-center leading-6 font-medium text-gray-900">
                      {props.bondName + " Bonds"}
                    </Dialog.Title>
                    <div className="mt-2">

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <input
                          type="number"
                          placeholder="Amount"
                          className="input col-span-2 ml-1 w-auto text-gray-500"
                          value={redemptionValue}
                          onChange={(e) => {
                            setRedemptionValue(e.target.value);
                            updateAmounts(e.target.value, maturity);
                          }}
                        />
                      </div>
                      <table className="ml-6 w-full">
                        <tbody>
                          <tr>
                            <td>Your Balance</td>
                            <td>{userAssetBalance || "0"}</td>
                          </tr>
                          <tr>
                            <td>You Receive</td>
                            <td>{redemptionValue + " HLX" || "N/A"}</td>
                          </tr>

                          <tr>
                            <td>Present Value</td>
                            <td>{presentValue || "N/A"}</td>
                          </tr>

                          <tr>
                            <td>Coupon Total</td>
                            <td>{couponTotal || "N/A"}</td>
                          </tr>


                          <tr>
                            <td>Due Amount</td>
                            <td>{dueAmount || "N/A"}</td>
                          </tr>
                          <tr>
                            <td>Vesting Period</td>
                            <td>{maturity || "N/A"}</td>
                            <td>
                              <input
									              	type="number"
									              	placeholder="vesting period in weeks"
									              	className="input input-bordered text-black"
									              	value={maturity}
									              	onChange={(e) => {
                                    setMaturity(e.target.value);
                                    updateAmounts(redemptionValue, e.target.value);
                                  }}
									              />
                            </td>
                          </tr>

                          <tr>
                            <td>Bond Discount</td>
                            <td>{(redemptionValue - dueAmount) || "N/A"}</td>
                          </tr>


                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() =>{
                    hasAccount ? (props.bondName == "SOL" ? solBond(redemptionValue, maturity, "devnet") : splBond(redemptionValue, maturity, props.bondAddr, props.bondName, "devnet")) : createBondAccount()
                  }}
                >
                  {!hasAccount ? "Make Vault" : "Mint Bond"}
                </button>
                
                {/* {
                  hasAccount &&
                  (
                    <button
                      onClick={redeemBonds}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Redeem Bruh Bonds
                    </button>
                  )
                } */}
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Exit
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
	</>
  )
}
