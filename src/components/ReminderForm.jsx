import React, { useState } from 'react';
    import styled from 'styled-components';

    const Form = styled.form`
      background: #2a2a2a;
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
    `;

    const InputGroup = styled.div`
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;

      @media (max-width: 600px) {
        flex-direction: column;
      }
    `;

    const Input = styled.input`
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      flex: 1;
      background: #3a3a3a;
      color: #fff;

      &[type="datetime-local"] {
        min-width: 200px;
      }
    `;

    const Button = styled.button`
      padding: 0.8rem 2rem;
      background: #3a7bd5;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #00d2ff;
      }
    `;

    const Error = styled.div`
      color: #ff4444;
      margin-top: 1rem;
    `;

    const ReminderForm = ({ addReminder }) => {
      const [text, setText] = useState('');
      const [time, setTime] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!text.trim()) {
          setError('Please enter reminder text');
          return;
        }

        if (!time) {
          setError('Please select a time');
          return;
        }

        if (new Date(time) < new Date()) {
          setError('Please select a future time');
          return;
        }

        addReminder(text, time);
        setText('');
        setTime('');
        setError('');
      };

      return (
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter reminder..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Button type="submit">Add Reminder</Button>
          </InputGroup>
          {error && <Error>{error}</Error>}
        </Form>
      );
    };

    export default ReminderForm;
