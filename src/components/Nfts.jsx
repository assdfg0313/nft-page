import axios from "axios";
import { useEffect, useState } from "react";
import NftCard from "./NftCard";
import basicData from "../utils/basicData.json";

const Nfts = ({ page }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nfts, setNfts] = useState();

  const getNfts = async (p) => {
    try {
      let nftArray = [];

      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;
        if (tokenId <= 47) {
          // let response = await axios.get("/jsons" + `/${tokenId}.json`);
          // console.log(tokenId);
          // console.log(response.data);
          // nftArray.push({ tokenId, metadata: response.data });

          nftArray.push({ tokenId, metadata: basicData[tokenId - 1] });
        }
      }
      console.log(nftArray.map((v, i) => v.metadata.name));

      setNfts(nftArray);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickPage = (p) => () => {
    setSelectedPage(p);
    getNfts(p);
  };

  const pageComp = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`ml-4 text-2xl font-bold hover:text-white ${
            i + 1 === selectedPage ? "text-white" : "text-gray-400"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1} <span className="text-base">페이지</span>
        </button>
      );
    }

    return pageArray;
  };

  useEffect(() => {
    // console.log(nfts);
  }, [nfts]);

  useEffect(() => {
    getNfts(1);
  }, []);

  return (
    <div>
      <div>{pageComp()}</div>
      <ul className="mx-4 mt-8 grid grid-cols-1 xl:grid-cols-5 justify-items-center gap-8">
        {nfts ? (
          nfts.map((v, i) => {
            return (
              <NftCard
                key={v.tokenId}
                tokenId={v.tokenId}
                metadata={v.metadata}
              />
            );
          })
        ) : (
          <div>로딩중입니다...</div>
        )}
      </ul>
    </div>
  );
};

export default Nfts;
