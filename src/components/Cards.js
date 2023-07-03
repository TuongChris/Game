import { useState, useRef, useEffect } from "react";
import Card from "./Card";
import "./Card.css";
import "./css/ranking.css";
import "./css/title-game.css";
import "./css/hamster.css";
import "./css/keyframe.css";
// import MemoryImage from "../img/Memory-game.jpg";
import "./api";
import axios from "axios";

export default function Cards() {
  const value = [
    { id: 0, name: "Dog Funny", status: "", img: "../image/qua-bo.jpg" },
    { id: 0, name: "Dog Funny", status: "", img: "../image/qua-bo.jpg" },
    { id: 1, name: "Dog Cute", status: "", img: "../image/qua-cam.jpg" },
    { id: 1, name: "Dog Cute", status: "", img: "../image/qua-cam.jpg" },
    { id: 2, name: "Meo Funny", status: "", img: "../image/qua-chuoi.jpg" },
    { id: 2, name: "Meo Funny", status: "", img: "../image/qua-chuoi.jpg" },
    { id: 3, name: "Meo Cute", status: "", img: "../image/qua-dau-tay.jpg" },
    { id: 3, name: "Meo Cute", status: "", img: "../image/qua-dau-tay.jpg" },
    { id: 4, name: "Meo Tim", status: "", img: "../image/qua-dua-hau.jpg" },
    { id: 4, name: "Meo Tim", status: "", img: "../image/qua-dua-hau.jpg" },
    { id: 5, name: "Meo Now", status: "", img: "../image/qua-gac.jpg" },
    { id: 5, name: "Meo Now", status: "", img: "../image/qua-gac.jpg" },
    { id: 6, name: "Meo Man", status: "", img: "../image/qua-nhan.jpg" },
    { id: 6, name: "Meo Man", status: "", img: "../image/qua-nhan.jpg" },
    { id: 7, name: "Meo Zoa", status: "", img: "../image/qua-xoai.jpg" },
    { id: 7, name: "Meo Zoa", status: "", img: "../image/qua-xoai.jpg" },
  ];

  const [cards, setCards] = useState(value.sort(() => Math.random() - 0.5));
  const [previousCardState, setPreviousCardState] = useState(-1);
  const previousIndex = useRef(-1);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [Sorce, setSorce] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [gameDuration, setGameDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const [finalGameDuration, setFinalGameDuration] = useState(0);
  const [restartTimer, setRestartTimer] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [timePlayed, setTimePlayed] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(3);
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    setTimePlayed(
      isGameCompleted
        ? finalGameDuration
        : isGameStarted && !isGameCompleted
        ? elapsedTime
        : 0
    );
  }, [isGameCompleted, isGameStarted, finalGameDuration, elapsedTime]);

  const handlePlayAgain = () => {
    setCards(value.sort(() => Math.random() - 0.5));
    setPreviousCardState(-1);
    previousIndex.current = -1;
    setSorce(0);
    setIsGameCompleted(false);
    setPlayAgain(false);
    setTimer(0);
    setIsRestarting(true);
    setElapsedTime(0);
    setRestartTimer(true);
    setIsGameStarted(true);
    setIsLoggedOut(false);
    setIsTimerRunning(true);
    setGameDuration(timer);
    setClickCount(0);
  };

  const handleGameComplete = () => {
    savePlayerData(playerName)
      .then((response) => {
        console.log(
          "Dữ liệu người chơi đã được gửi thành công:",
          response.data
        );
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu người chơi:", error);
      });
  };
  useEffect(() => {
    if (isGameCompleted) {
      savePlayerData(playerName)
        .then((response) => {
          console.log(
            "Dữ liệu người chơi đã được gửi thành công:",
            response.data
          );
        })
        .catch((error) => {
          console.error("Lỗi khi gửi dữ liệu người chơi:", error);
        });
    }
  }, [isGameCompleted, playerName]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi truy xuất dữ liệu người chơi:", error);
      });
  }, []);

  const savePlayerData = (name) => {
    const data = {
      name: name,
      timePlayed: timePlayed,
    };
    return axios.post("http://localhost:3000/players", data);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/players")
      .then((response) => {
        const limitedPlayers = response.data.slice(0, displayLimit);
        setPlayers(limitedPlayers);
      })
      .catch((error) => {
        console.error("Lỗi khi truy xuất dữ liệu người chơi:", error);
      });
  }, [displayLimit]);
  const combinedPlayers = sortedPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }));
  const rankingRows = combinedPlayers.slice(0, 10).map((player) => (
    <tr key={player.id} className="ranking-head">
      <td className="ranking-number delay-ranking">{player.rank}</td>
      <td className="ranking-name">
        <span class="title-word title-word-1">{player.name}</span>
      </td>
      <td className="ranking-time">
        <div className="rank-time-1">{player.timePlayed || 0} giây</div>
      </td>
    </tr>
  ));
  const leaderBoard = (
    <>
      {!isNameEntered && !playAgain && !isLoggedOut && (
        <table className="ranking">
          <p className="ranking-title">Bảng Xếp Hạng</p>
          <thead>
            <tr className="ranking-head">
              <th className="ranking-number">STT</th>
              <th className="ranking-name">
                <span class="title-word title-word-1">Tên</span>
                <span class="title-word title-word-2">Người</span>
                <span class="title-word title-word-3">Chơi</span>
              </th>
              <th className="ranking-time">
                <div className="rank-time-1">Thời gian</div>
              </th>
            </tr>
          </thead>
          <tbody className="ranking-body">{rankingRows}</tbody>
          <button
            onClick={() => setDisplayLimit(displayLimit + 10000)}
            className="button-rank"
          >
            Xem thêm
          </button>
        </table>
      )}
    </>
  );
  const sortPlayersByTimePlayed = () => {
    const sorted = [...players].sort((a, b) => a.timePlayed - b.timePlayed);
    setSortedPlayers(sorted);
  };
  useEffect(() => {
    sortPlayersByTimePlayed();
  }, [players]);
  const sortedPlayersWithRank = sortedPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }));
  const handleLoadMore = () => {
    sortPlayersByTimePlayed();
    setDisplayLimit(displayLimit + 10);
  };

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
      } else {
        setTimeout(() => {
          cards[currentCard].status = "unmatch";
          cards[previousCardState].status = "unmatch";
          setCards([...cards]);
          setPreviousCardState(-1);
        }, 300);
      }
    }
  };
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
          setClickCount((prevCount) => prevCount + 1);
        }
      }
    } else {
      alert("Thẻ đã được chọn");
    }
  };
  const updateGameDuration = () => {
    if (isGameCompleted) {
      setFinalGameDuration(timer);
    }
  };
  useEffect(() => {
    updateGameDuration();
  }, [isGameCompleted]);

  useEffect(() => {
    const matchedCards = cards.filter(
      (card) => card.status === "active matched"
    );
    if (matchedCards.length === cards.length) {
      setIsGameCompleted(true);
    }
  }, [cards]);

  const handleNameSubmit = () => {
    if (playerName.trim() !== "") {
      setIsNameEntered(true);
      setIsGameStarted(true);
      previousIndex.current = -1;
      setIsTimerRunning(true);
      setIsLoggedOut(false);
    }
  };
  const handleLogout = () => {
    setIsLoggedOut(true);
    setIsNameEntered(false);
    setIsGameStarted(false);
    setIsGameCompleted(false);
    setTimer(0);
    setIsTimerRunning(false);
    setIsRestarting(false);
    setElapsedTime(0);
    setFinalGameDuration(0);
    setRestartTimer(false);
  };

  useEffect(() => {
    if (Sorce === 8) setIsGameCompleted(true);
  }, [Sorce]);
  useEffect(() => {
    if (isTimerRunning && !isGameCompleted) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (isRestarting) {
      setFinalGameDuration(timer);
      setIsRestarting(false);
    }
    if (restartTimer) {
      setTimer(0);
      setElapsedTime(0);
      setRestartTimer(false);
    }
  }, [isTimerRunning, isGameCompleted, isRestarting, timer, restartTimer]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      setClickCount(0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleGoBack = () => {
    setIsNameEntered(false);
    setPlayAgain(false);
    setIsLoggedOut(false);
  };

  return (
    <>
      {!isNameEntered && !playAgain && !isLoggedOut && (
        <>
          <h1 className="title-game">
            <ul>
              <li>M</li>
              <li>E</li>
              <li>M</li>
              <li>O</li>
              <li>R</li>
              <li>Y</li>
              <li>G</li>
              <li>A</li>
              <li>M</li>
              <li>E</li>
            </ul>
          </h1>
          <div className="texts-animation">
            <p className="game-name">
              <div className="game-name-1">Trò chơi trí nhớ</div>
              <div className="game-name-2">Trò chơi trí nhớ</div>
            </p>
            <div class="dropping-texts">
              <div className="effect">Giúp giảm Stress</div>
              <div className="effect">Tăng khả năng ghi nhớ</div>
              <div className="effect">Thư giãn trong thời gian rảnh rỗi</div>
              <div className="effect">Hãy nhập tên của bạn để chơi</div>
            </div>
          </div>
          <div className="name-input-form">
            <input
              type="text"
              required
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNameSubmit();
                }
              }}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>T</span>
              <span style={{ transitionDelay: "50ms" }}>Ê</span>
              <span style={{ transitionDelay: "100ms" }}>N</span>
              <span
                style={{ transitionDelay: "150ms" }}
                className="left-alignment"
              >
                C
              </span>
              <span style={{ transitionDelay: "200ms" }}>Ủ</span>
              <span style={{ transitionDelay: "250ms" }}>A</span>
              <span
                style={{ transitionDelay: "300ms" }}
                className="left-alignment"
              >
                B
              </span>
              <span style={{ transitionDelay: "350ms" }}>Ạ</span>
              <span style={{ transitionDelay: "400ms" }}>N</span>
            </label>
          </div>
          <button onClick={handleNameSubmit} className="start-playing">
            <span class="button_top"> Nhấn để chơi</span>
          </button>
          {/* <div className="img-memory-game">
            <p className="title-img">Hình ảnh mô tả</p>
            <img src={MemoryImage} alt="memory-main" className="img-memory" />
          </div> */}
        </>
      )}
      {isNameEntered && !isLoggedOut && (
        <>
          <div class="dark fire">
            <h1 class="Blazing" contenteditable="true">
              <p className="greet">Xin Chào Bạn {playerName} !</p>
            </h1>
          </div>
          {isGameStarted && (
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
              {isGameCompleted && (
                <div className="game-completed">
                  <p className="congratulations">
                    <span>Chúc</span>
                    <span>Mừng</span>
                    <span>Bạn</span>
                    <span>Đã</span>
                    <span>Giành</span>
                    <span>Chiến</span>
                    <span>Thắng!</span>
                  </p>
                  <p className="time-played">
                    Thời gian chơi của bạn:{timePlayed}
                    giây
                  </p>
                  {isGameStarted && !isGameCompleted && (
                    <div className="timer">Thời gian: {timer} giây</div>
                  )}
                  <p className="number-of-click">
                    Số lần chọn thẻ: {clickCount}
                  </p>
                  <button onClick={handlePlayAgain} className="play-again">
                    Bạn có muốn chơi lại không?
                  </button>
                  <div class="pyro">
                    <div class="before"></div>
                    <div class="after"></div>
                  </div>
                </div>
              )}
              {isGameStarted && !isGameCompleted && (
                <>
                  <div className="timer">
                    <p className="timer-of-number">
                      Thời gian chơi:{" "}
                      <span className="timer-blink">{timer}</span> giây
                    </p>
                    <div
                      aria-label="Orange and tan hamster running in a metal wheel"
                      role="img"
                      class="wheel-and-hamster"
                    >
                      <div className="wheel"></div>
                      <div className="hamster">
                        <div className="hamster__body">
                          <div className="hamster__head">
                            <div className="hamster__ear"></div>
                            <div className="hamster__eye"></div>
                            <div className="hamster__nose"></div>
                          </div>
                          <div className="hamster__limb hamster__limb--fr"></div>
                          <div className="hamster__limb hamster__limb--fl"></div>
                          <div className="hamster__limb hamster__limb--br"></div>
                          <div className="hamster__limb hamster__limb--bl"></div>
                          <div className="hamster__tail"></div>
                        </div>
                      </div>
                      <div className="spoke"></div>
                    </div>
                    <p className="number-of-click">
                      Số lần chọn thẻ: {clickCount}
                    </p>
                  </div>
                  <div className="play-again-container">
                    <button onClick={handlePlayAgain} className="start-over">
                      Bạn có muốn bắt đầu lại không?
                    </button>
                  </div>
                  <button onClick={handleLogout} className="Log-out">
                    <span class="button_top"> Đăng xuất</span>
                  </button>
                </>
              )}
            </div>
          )}
          {!isGameCompleted && (
            <button onClick={handleGoBack} className="cssbuttons-io-button">
              Quay lại
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  ></path>
                </svg>
              </div>
            </button>
          )}
        </>
      )}
      {isLoggedOut && (
        <>
          <p className="reveal-text">
            <span>Hãy nhập tên mới và đăng nhập lại để chơi nhé!</span>
          </p>
          <div className="name-input-form">
            <input
              type="text"
              required
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNameSubmit();
                }
              }}
            />
            <label>
              <span style={{ transitionDelay: "0ms" }}>T</span>
              <span style={{ transitionDelay: "50ms" }}>Ê</span>
              <span style={{ transitionDelay: "100ms" }}>N</span>
              <span
                style={{ transitionDelay: "150ms" }}
                className="left-alignment"
              >
                C
              </span>
              <span style={{ transitionDelay: "200ms" }}>Ủ</span>
              <span style={{ transitionDelay: "250ms" }}>A</span>
              <span
                style={{ transitionDelay: "300ms" }}
                className="left-alignment"
              >
                B
              </span>
              <span style={{ transitionDelay: "350ms" }}>Ạ</span>
              <span style={{ transitionDelay: "400ms" }}>N</span>
            </label>
          </div>
          <button onClick={handleNameSubmit} className="start-playing">
            <span className="button_top"> Đăng nhập lại</span>
          </button>
          {/* <button onClick={handleResetData}>Reset dữ liệu</button> */}
          <div class="cloud-container">
            <div class="cloud front">
              <span class="left-front"></span>
              <span class="right-front"></span>
            </div>
            <span class="sun sunshine"></span>
            <span class="sun"></span>
            <div class="cloud back">
              <span class="left-back"></span>
              <span class="right-back"></span>
            </div>
          </div>
        </>
      )}
      {leaderBoard}
    </>
  );
}
