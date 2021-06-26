import { useEffect, useState } from "react";
import { Card } from "../../providers/api/CardProvider/CardProvider";
import providers from "../../providers";

export default function useController() {
  const getPromptFromFirstCard = () => cardList[0]?.prompt ?? "";

  const [cardList, setCardList] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    fetchCards();
  }, []);
  useEffect(() => {
    setPrompt(getPromptFromFirstCard());
  }, [cardList]);

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const response = await providers.CardProvider.getAll();
      setCardList(response);
    } finally {
      setIsLoading(false);
    }
  };

  const onCurrentSlideChange = (slideIndex: number) => {
    setPrompt(cardList?.[slideIndex]?.prompt ?? "");
  };

  return {
    prompt,
    isLoading,
    cardList,
    onCurrentSlideChange,
  };
}
