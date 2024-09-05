// app/page.tsx
import { useState } from 'react';

export default function Page() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Tareas</h1>

      <div style={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añadir una tarea..."
          style={styles.input}
        />
        <button onClick={handleAddItem} style={styles.button}>
          Añadir
        </button>
      </div>

      <ul style={styles.list}>
        {items.map((item, index) => (
          <li key={index} style={styles.listItem}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as const,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '70%',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  listItem: {
    padding: '10px',
    fontSize: '18px',
    borderBottom: '1px solid #eee',
  },
};
