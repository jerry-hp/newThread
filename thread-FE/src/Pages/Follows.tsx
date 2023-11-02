import { useState } from "react";
import Layout from "../layouts/Main";
import "../tailwind.css";

function Follows() {
  const [isTab, setIsTab] = useState(false);
  return (
    <div>
      <Layout>
        <div className="box-border px-3 p-gray-200 grid gap-y-2">
          <h1 className="text-2xl col-span-2 text-[#008000]">Follows</h1>
          <button style={{ color: isTab ? "#008000" : "white", borderBottom: isTab ? "2px solid #008000" : "2px solid white" }} className="col-span-1 " onClick={() => setIsTab(true)}>
            Followers
          </button>
          <button
            style={{ color: !isTab ? "#008000" : "white", borderBottom: !isTab ? "2px solid #008000" : "2px solid white" }}
            className="col-span-1  focus:text-[#008000] border-b-2 focus:border-[#008000]"
            onClick={() => setIsTab(false)}
          >
            Following
          </button>
          <div className="col-span-2">
            {isTab ? (
              <>
                <div className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-2">
                  <img src="https://images.pexels.com/photos/15483667/pexels-photo-15483667/free-photo-of-flag-of-palestine.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-10 h-full rounded-full row-span-2" />
                  <p className="col-span-10">Jamaludin</p>
                  <p className="col-span-10 text-gray-400"> @Jamal23</p>
                  <div className="row-span-2 h-full flex items-center">
                    <button className="border rounded-full border-white px-4 h-[70%]">Follow</button>
                  </div>
                </div>
                <div className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-2">
                  <img src="https://images.pexels.com/photos/15483667/pexels-photo-15483667/free-photo-of-flag-of-palestine.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-10 h-full rounded-full row-span-2" />
                  <p className="col-span-10">Jamaludin</p>
                  <p className="col-span-10 text-gray-400"> @Jamal23</p>
                  <div className="row-span-2 h-full flex items-center">
                    <button className="border rounded-full border-white px-4 h-[70%]">Follow</button>
                  </div>
                </div>
                <div className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-2">
                  <img src="https://images.pexels.com/photos/15483667/pexels-photo-15483667/free-photo-of-flag-of-palestine.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-10 h-full rounded-full row-span-2" />
                  <p className="col-span-10">Jamaludin</p>
                  <p className="col-span-10 text-gray-400"> @Jamal23</p>
                  <div className="row-span-2 h-full flex items-center">
                    <button className="border rounded-full border-white px-4 h-[70%]">Follow</button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-2">
                  <img src="https://images.pexels.com/photos/15483667/pexels-photo-15483667/free-photo-of-flag-of-palestine.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-10 h-full rounded-full row-span-2" />
                  <p className="col-span-10">udinnnn</p>
                  <p className="col-span-10 text-gray-400"> @udiiinn</p>
                  <div className="row-span-2 h-full flex items-center">
                    <button className="border rounded-full border-gray-400 text-gray-400 px-4 h-[70%]">Following</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Follows;
