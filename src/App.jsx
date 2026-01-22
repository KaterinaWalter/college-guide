import './App.css';
import { useState } from 'react';
import Page from './Page';

function App() {
  const pages = [
    { id: '0', color: 'none' },
    { id: '1', color: 'white' },
    { id: '2', color: 'white' },
    { id: '3', color: 'white' },
    { id: '4', color: 'white' },
    { id: '5', color: 'white' },
    { id: '6', color: 'white' },
    { id: '7', color: 'white' }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turningDirection, setTurningDirection] = useState(null);
  const [nextPages, setNextPages] = useState({ left: null, right: null });
  const [prevPages, setPrevPages] = useState({ left: null, right: null });

  const turn = (direction) => {
    if (isTurning) return;

    const isNext = direction === 'next';
    const newLeftData = isNext ? pages[currentIdx + 2] : pages[currentIdx - 2];
    const newRightData = isNext ? pages[currentIdx + 3] : pages[currentIdx - 1];

    if (!newLeftData && !newRightData) return;

    setIsTurning(true);
    setTurningDirection(direction);

    if (isNext) {
      setNextPages({ left: newLeftData, right: newRightData });
    } else {
      setPrevPages({ left: newLeftData, right: newRightData });
    }

    setTimeout(() => {
      const newIdx = isNext ? currentIdx + 2 : currentIdx - 2;
      setCurrentIdx(newIdx);
      setIsTurning(false);
      setTurningDirection(null);
      setNextPages({ left: null, right: null });
      setPrevPages({ left: null, right: null });
    }, 800);
  };

  const currentLeft = pages[currentIdx];
  const currentRight = pages[currentIdx + 1];

  return (
    <div className="App">
      <h1>College Brochure</h1>
      <div className="book">
        {currentLeft && (
          <Page
            id={currentLeft.id}
            color={currentLeft.color}
            position="left"
            status="current"
            isTurning={isTurning && turningDirection === 'prev'}
          />
        )}
        {currentRight && (
          <Page
            id={currentRight.id}
            color={currentRight.color}
            position="right"
            status="current"
            isTurning={isTurning && turningDirection === 'next'}
          />
        )}
        {nextPages.left && (
          <Page
            id={nextPages.left.id}
            color={nextPages.left.color}
            position="left"
            status="next"
            isTurning={isTurning}
          />
        )}
        {nextPages.right && (
          <Page
            id={nextPages.right.id}
            color={nextPages.right.color}
            position="right"
            status="next"
            isTurning={false}
          />
        )}
        {prevPages.left && (
          <Page
            id={prevPages.left.id}
            color={prevPages.left.color}
            position="left"
            status="prev"
            isTurning={false}
          />
        )}
        {prevPages.right && (
          <Page
            id={prevPages.right.id}
            color={prevPages.right.color}
            position="right"
            status="prev"
            isTurning={isTurning}
          />
        )}
      </div>

      <div className="btns">
        <button
          className="prev"
          onClick={() => turn('prev')}
          disabled={isTurning || currentIdx === 0}
        >
          &lt;&lt;&lt;
        </button>
        <button
          className="next"
          onClick={() => turn('next')}
          disabled={isTurning || currentIdx >= pages.length - 2}
        >
          &gt;&gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default App;
