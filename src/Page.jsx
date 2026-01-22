import React from 'react';

function Page({ id, color, position, status, isTurning }) {
  const classNames = [
    'page',
    position, // 'left' or 'right'
    color,
    status, // 'current', 'next', or 'prev'
    isTurning ? 'turn' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {id !== '0' && id}
    </div>
  );
}

export default Page;
