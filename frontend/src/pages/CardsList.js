import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import useCardList from "../hooks/useCardList";

const CardsList = () => {
  const { cards, loading } = useCardList();
  const navigate = useNavigate();

  const onAddNewCard = () => {
    navigate("/new");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="w-96">
      <div className="mb-4">
        {Boolean(cards.length) &&
          cards.map((card) => <Card key={card.cardNumber} {...card} />)}
        {!loading && !cards.length && (
          <div className="w-full shadow rounded-lg bg-white p-4">
            <p className="text-center font-bold text-xl">No cards saved yet</p>
          </div>
        )}
      </div>
      <Button text="Add new card" onClick={onAddNewCard} />
    </div>
  );
};

export default CardsList;
