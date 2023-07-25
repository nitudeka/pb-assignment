import Input from "../components/Input";
import ImgCard from "../assets/png/credit-card.png";
import ImgCalendar from "../assets/png/calendar.png";
import ImgI from "../assets/png/i.png";
import ImgUser from "../assets/png/id-card.png";
import Button from "../components/Button";
import useNewCard from "../hooks/useNewCard";

const CardNew = () => {
  const {
    cardNumber,
    handleNumChange,
    expiryDate,
    handleExpiry,
    cvv,
    handleCvv,
    name,
    handleName,
    onSubmit,
    errors,
  } = useNewCard();

  return (
    <div className="w-96 shadow-md p-5 rounded-xl bg-white">
      <h2 className="font-bold text-gray-700 border-b border-gray-200 pb-3">
        Add new card
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <Input
            value={cardNumber}
            onChange={handleNumChange}
            label="Card number"
            placeholder="0000 0000 0000 0000"
            icon={ImgCard}
            name="cardNumber"
            error={errors.cardNumber}
          />
          <div className="flex">
            <Input
              value={expiryDate}
              onChange={handleExpiry}
              name="expiryDate"
              label="Expiry date"
              placeholder="MM / YY"
              icon={ImgCalendar}
              error={errors.expiryDate}
            />
            <div className="p-2" />
            <Input
              value={cvv}
              onChange={handleCvv}
              name="cvv"
              label="CVV"
              placeholder="&#8226; &#8226; &#8226;"
              icon={ImgI}
              type="password"
              error={errors.cvv}
            />
          </div>
          <Input
            value={name}
            onChange={handleName}
            name="name"
            label="Cardholder name"
            placeholder="Enter cardholder's full name"
            icon={ImgUser}
            error={errors.name}
          />
        </div>
        <Button type="submit" text="Add card" />
      </form>
    </div>
  );
};

export default CardNew;
