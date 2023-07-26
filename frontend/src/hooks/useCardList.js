import { useEffect, useState } from "react";
import { getUUID } from "../utils/common";

const useCardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    const res = await fetch("/api/cards", {
      headers: { uuid: getUUID() },
    });
    const data = await res.json();

    setLoading(false);
    return data.cards;
  };

  useEffect(() => {
    fetchCards().then(setCards).catch(console.error);
  }, []);

  return { cards, loading };
};

export default useCardList;
