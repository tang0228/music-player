import React from 'react';

export default function Musician() {
  return (
    <div style={{
      height: 'calc(100vh - 145px)',
      width: 980,
      border: '1px solid #d3d3d3',
      borderTop: 'none',
      boxSizing: 'border-box',
      borderBottom: 'none',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <a target='_blank' href="https://music.163.com/st/musician">去音乐人</a>
    </div>
  )
}
