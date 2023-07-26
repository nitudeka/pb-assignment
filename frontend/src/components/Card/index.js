import ImgCard from "../../assets/png/chip.png";

const Card = (props) => {
  return (
    <div className="relative mb-4 bg-gradient-to-r from-gray-600 to-gray-900 text-gray-100 w-96 shadow-md p-5 rounded-xl bg-white rounded-lg flex flex-col justify-between">
      <img
        src={ImgCard}
        alt="chip"
        className="absolute top-1/2 h-16 right-8 -translate-y-1/2"
      />
      <div>
        <h3 className="font-bold text-3xl">{props.name}</h3>
      </div>
      <div className="flex align-end">
        <div>
          <h3 className="font-bold mt-24 text-lg">
            {props.cardNumber.match(/.{1,4}/g).join(" ")}
          </h3>
          <p>{props.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
