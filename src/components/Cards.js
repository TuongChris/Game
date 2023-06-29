import { useState, useRef, useEffect } from "react";
import Card from "./Card";

//Định nghĩa component Cards và khởi tạo các state ban đầu
export default function Cards() {
  const value = [
    { id: 0, name: "Dog Funny", status: "", img: "../image/dog-image4.jpg" },
    { id: 0, name: "Dog Funny", status: "", img: "../image/dog-image4.jpg" },
    { id: 1, name: "Dog Cute", status: "", img: "../image/dog-img.jpg" },
    { id: 1, name: "Dog Cute", status: "", img: "../image/dog-img.jpg" },
    { id: 2, name: "Meo Funny", status: "", img: "../image/meo-image4.jpg" },
    { id: 2, name: "Meo Funny", status: "", img: "../image/meo-image4.jpg" },
    { id: 3, name: "Meo Cute", status: "", img: "../image/meo-image5.jpg" },
    { id: 3, name: "Meo Cute", status: "", img: "../image/meo-image5.jpg" },
    { id: 4, name: "Meo Tim", status: "", img: "../image/meo-image6.jpg" },
    { id: 4, name: "Meo Tim", status: "", img: "../image/meo-image6.jpg" },
    { id: 5, name: "Meo Now", status: "", img: "../image/meo-img.jpg" },
    { id: 5, name: "Meo Now", status: "", img: "../image/meo-img.jpg" },
    { id: 6, name: "Meo Man", status: "", img: "../image/meo-img2.jpg" },
    { id: 6, name: "Meo Man", status: "", img: "../image/meo-img2.jpg" },
    { id: 7, name: "Meo Zoa", status: "", img: "../image/meo-img3.jpg" },
    { id: 7, name: "Meo Zoa", status: "", img: "../image/meo-img3.jpg" },
  ];
  const [cards, setCards] = useState(value.sort(() => Math.random() - 0.5));

  const [previousCardState, setPreviousCardState] = useState(-1);
  const previousIndex = useRef(-1);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [Sorce, setSorce] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);

  //Định nghĩa hàm handlePlayAgain để xử lý sự kiện khi nhấp vào nút "Play Again":
  const handlePlayAgain = () => {
    setCards(value.sort(() => Math.random() - 0.5));
    setPreviousCardState(-1);
    previousIndex.current = -1;
    setIsGameCompleted(false);
    setPlayAgain(false);
  };

  //Định nghĩa hàm matchCheck để kiểm tra sự khớp nhau của các thẻ:
  const matchCheck = (currentCard) => {
    if (cards[currentCard].id === cards[previousCardState].id) {
      cards[previousCardState].status = "active matched";
      cards[currentCard].status = "active matched";
      setSorce((e) => e + 1);
      setPreviousCardState(-1);
    } else {
      cards[currentCard].status = "active";
      setCards([...cards]);
      setPreviousCardState(currentCard);

      const allMatched = cards.every(
        (card) => card.status === "active matched"
      );
      if (allMatched) {
        setIsGameCompleted(true);
        // setSorce((e) => e + 1);
        // console.log(isGameCompleted);
        // setCards([...cards]);
      } else {
        setTimeout(() => {
          cards[currentCard].status = "unmatch";
          cards[previousCardState].status = "unmatch";
          setCards([...cards]);
          setPreviousCardState(-1);
          // console.log(cards.length);
        }, 300);
      }
    }
  };

  //Định nghĩa hàm clickhandler để xử lý sự kiện khi nhấp vào một thẻ:
  const clickhandler = (index) => {
    if (index !== previousIndex.current) {
      if (cards[index].status === "active matched") {
        alert("Thẻ đã được kết hợp");
      } else {
        if (previousCardState === -1) {
          previousIndex.current = index;
          cards[index].status = "active";
          setCards([...cards]);
          setPreviousCardState(index);
        } else {
          matchCheck(index);

          previousIndex.current = -1;
        }
      }
    } else {
      alert("Thẻ đã được chọn");
    }
  };

  //Sử dụng useEffect để kiểm tra xem trò chơi đã hoàn thành hay chưa:
  useEffect(() => {
    const matchedCards = cards.filter(
      (card) => card.status === "active matched"
    );
    if (matchedCards.length === cards.length) {
      setIsGameCompleted(true);
    }
    // console.log(Sorce);
  }, [cards]);
  useEffect(() => {
    if (Sorce === 8) setIsGameCompleted(true);
  }, [Sorce]);

  return (
    <div className="container">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            card={card}
            index={index}
            clickhandler={clickhandler}
          />
        );
      })}
      {isGameCompleted ? (
        <div className="game-completed">
          Chúc mừng bạn đã chiến thắng!
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      ) : (
        console.log("False")
      )}

      <div className="play-again-container">
        <button onClick={handlePlayAgain}>Play Again</button>
      </div>
    </div>
  );
}
