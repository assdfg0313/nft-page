import { GiCardAceSpades } from "react-icons/gi";
import { Link } from "react-router-dom";

const NftCard = ({ tokenId, metadata }) => {
  return (
    <div className="rounded-2xl bg-gray-800 pb-4/">
      <div className="relative">
        <img
          className="rounded-t-2xl w-[300px] h-[300px]"
          src={metadata.imgUrl}
          alt={metadata.name}
        />
        {parseInt(tokenId) % 3 == 0 && (
          <div className="absolute top-0 left-0 bg-black/50  w-[300px] h-[300px] flex text-2xl text-gray-50/40 justify-center items-center">
            Already Mint!!
          </div>
        )}
      </div>
      <div className="mt-4 text-xl font-bold flex items-center px-4 text-gray-300">
        {metadata.kind}
        <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center ml-2 text-gray-950">
          <GiCardAceSpades size={16} />
        </div>
      </div>
      <div className="mt-4 text-2xl font-bold px-4">{metadata.name}</div>
      <div className="mt-4 text-xl flex justify-end px-4">
        <Link to={`${tokenId}`}>
          <button className="bg-gray-50 text-gray-950 px-4 py-2 rounded-xl hover:bg-gray-500">
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NftCard;
