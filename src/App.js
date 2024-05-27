
// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
    setCopySuccess('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => setCopySuccess('Password copied!'),
      () => setCopySuccess('Failed to copy password')
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Generator</h1>
      </header>
      <div className="password-generator">
        <div className="form-group">
          <label>Password Length</label>
          <input
            type="number"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Include Uppercase Letters
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include Symbols
          </label>
        </div>
        <button className="generate-button" onClick={generatePassword}>
          Generate Password
        </button>
        {password && (
          <div className="password-result">
            <p>Your generated password:</p>
            <div className="password-container">
              <p className="password">{password}</p>
              <button className="copy-button" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
            {copySuccess && <p className="copy-success">{copySuccess}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
