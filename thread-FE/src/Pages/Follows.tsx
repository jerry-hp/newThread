import { useEffect, useState } from "react";
import Layout from "../layouts/Main";
import "../tailwind.css";
import { api } from "../libs/api/api";
import { useSelector } from "react-redux";

function Follows() {
  const [isTab, setIsTab] = useState(true);
  const [follow, setFollow] = useState([]);
  const full_name = useSelector((item: any) => item.auth.full_name);
  const userId = useSelector((item: any) => item.auth.id);

  //get followers
  const filteredFollowers = follow.filter((item: any) => {
    return item.following_id.full_name == full_name;
  });

  //get following
  const filteredFollowing = follow.filter((item: any) => {
    return item.follower_id.full_name == full_name;
  });

  console.log({ filteredFollowers });

  //post follow sampai sini
  function handleFollow(e: any) {
    const following = e;

    const dataFollow = {
      follower_id: userId,
      following_id: following,
    };
    api.post("/follow", dataFollow);
  }

  useEffect(() => {
    api.get("/follows").then((res) => setFollow(res.data.follow));
  }, [isTab]);

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
                {filteredFollowers.map((item: any, key: number) => (
                  <div key={key} className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-3">
                    <img src={item.follower_id.profile_picture} alt="" className="w-10 h-full rounded-full row-span-2" />
                    <p className="col-span-10">{item.follower_id.full_name}</p>
                    <p className="col-span-10 text-gray-400"> {item.follower_id.username}</p>
                    <div className="row-span-2 h-full flex items-center">
                      <button className="border rounded-full border-white px-4 h-[70%]" onClick={() => handleFollow(item.follower_id.id)}>
                        {item.follower_id.id !== userId ? "Follow" : "unfollow"}
                        {/* it need to fix */}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                {filteredFollowing.map((item: any, key) => (
                  <div key={key} className="h-10 grid grid-cols-10 grid-rows-2 grid-flow-col place-items-start text-yellow-50 mb-2">
                    <img src={item.following_id.profile_picture} alt="" className="w-10 h-full rounded-full row-span-2" />
                    <p className="col-span-10">{item.following_id.full_name}</p>
                    <p className="col-span-10 text-gray-400">{item.following_id.username}</p>
                    <div className="row-span-2 h-full flex items-center">
                      <button className="border rounded-full border-gray-400 text-gray-400 px-4 h-[70%]">Following</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Follows;
