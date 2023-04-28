import axios from "axios";
import { useEffect, useState } from "react";
import { FaChessRook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import basicData from "../utils/basicData.json";

const Detail = () => {
  const [metadata, setMetadata] = useState();

  const { tokenId } = useParams();

  const getNft = async () => {
    try {
      // const response = await axios.get("/jsons" + `/${tokenId}.json`);
      // setMetadata(response.data);
      setMetadata(basicData[parseInt(tokenId)]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNft();
  }, []);

  useEffect(() => console.log(metadata), [metadata]);

  return (
    <div className="flex flex-col xl:flex-row justify-center items-center py-16 bg-gray-900">
      {metadata ? (
        <>
          <div className="max-w-[512px]">
            <img className="rounded-2xl" src={metadata.imgUrl} alt="NFT" />
          </div>
          <div className="m-8">
            <div className="text-4xl flex items-center">
              <div>{metadata.name}</div>
              <div className="bg-main w-8 h-8 rounded-full flex justify-center items-center ml-2 text-gray-950">
                <FaChessRook size={18} />
              </div>
            </div>
            <div className="mt-8 text-2xl">{metadata.kind}</div>
            <div className="mt-8 text-2xl">{metadata.description}</div>
            <div className="mt-8 text-l w-[300px]">{metadata.detail}</div>
          </div>
        </>
      ) : (
        <div>로딩중입니다...</div>
      )}
    </div>
  );
};

export default Detail;
