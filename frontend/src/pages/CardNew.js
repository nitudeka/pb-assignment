import Input from "../components/Input";
import ImgCard from "../assets/png/credit-card.png";
import Button from "../components/Button";

const CardNew = () => {
  return (
    <div className="w-96 shadow-md p-5 rounded-xl bg-white">
      <h2 className="font-bold text-gray-700 border-b border-gray-200 pb-3">
        Add new card
      </h2>
      <div className="mb-4">
        <Input
          label="Card number"
          placeholder="0000 0000 0000 0000"
          icon={ImgCard}
        />
        <div className="flex">
          <Input label="Expiry date" placeholder="MM / YY" icon={ImgCard} />
          <div className="p-2" />
          <Input
            label="CVV"
            placeholder="&#8226; &#8226; &#8226;"
            icon={ImgCard}
            type="password"
          />
        </div>
        <Input
          label="Cardholder name"
          placeholder="Enter cardholder's full name"
          icon={ImgCard}
        />
      </div>
      <Button text="Add card" />
    </div>
  );
};

export default CardNew;
