import React from 'react';
import Blob from '../component/Blob';

const App = () => {
  return (
    <div>
      <h1>Blobs!</h1>
      <Blob text="Hello, world!" />
      <Blob text="This is a blob." />
      <Blob text="Blobs are cool." />
    </div>
  );
};

export default App;
