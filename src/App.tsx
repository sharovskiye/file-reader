import { ChangeEvent, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [countValidPassword, setCountValidPassword] = useState(0);

  const getCountValidPassword = (lines: string[]) => {
    return lines.reduce((acc, line) => {
      const [condition, password] = line.split(': ');
      const [letter, count] = condition.split(' ');
      const [minCount, maxCount] = count.split('-');
      const reg = new RegExp(letter, 'g');

      const countLetters = password.match(reg)?.length || 0;

      return countLetters >= Number(minCount) &&
        countLetters <= Number(maxCount)
        ? acc + 1
        : acc;
    }, 0);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e?.target?.result as string;
        setCountValidPassword(getCountValidPassword(result.split('\r\n')));
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Count validation password: {countValidPassword}</p>
        <input type="file" onChange={onChange} accept=".txt" />
      </main>
    </div>
  );
}

export default App;
