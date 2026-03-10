import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [timeLeft, setTimeLeft] = useState(60);
	const [isActive, setIsActive] = useState(false);
	const [isFinished, setIsFinished] = useState(false);

	useEffect(() => {
		let timer;
		if (isActive && timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		}
		if (timeLeft === 0 && isActive) {
			setIsActive(false);
			setIsFinished(true);
		}
		return () => clearInterval(timer);
	}, [isActive, timeLeft]);

	const handleActionClick = () => {
		if (timeLeft > 0 && !isFinished) {
			if (!isActive) setIsActive(true);
			setCount((prev) => prev + 1);
		}
	};

	const stopGame = () => setIsActive(false);

	const finishAttempt = () => {
		setIsActive(false);
		setIsFinished(true);
	};

	const resetGame = () => {
		setCount(0);
		setTimeLeft(60);
		setIsActive(false);
		setIsFinished(false);
	};

	const secondsSpent = 60 - timeLeft;
	const cps = secondsSpent > 0 ? (count / secondsSpent).toFixed(2) : 0;

	return (
		<div className="container">
			<h1 className="title">CPS Test</h1>

			<div className="game-card">
				<div className="timer-display">
					<span>{timeLeft}</span>s
				</div>

				{!isFinished ? (
					<div className="controls">
						<button
							className="click-btn"
							onClick={handleActionClick}
						>
							{count} {count === 1 ? "Клик" : "Кликов"}
						</button>

						<div className="action-row">
							{isActive && (
								<button
									className="btn pause"
									onClick={stopGame}
								>
									Пауза
								</button>
							)}

							{!isActive && count > 0 && (
								<button
									className="btn finish"
									onClick={finishAttempt}
								>
									Завершить
								</button>
							)}
						</div>
					</div>
				) : (
					<div className="result-screen">
						<h2>Результат</h2>
						<div className="stats">
							<p>
								Всего кликов: <strong>{count}</strong>
							</p>
							<p>
								Скорость: <strong>{cps}</strong> КПС
							</p>
						</div>
						<button className="btn reset" onClick={resetGame}>
							Повторить
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
