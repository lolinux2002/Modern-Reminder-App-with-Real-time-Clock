import React from 'react';
    import styled from 'styled-components';
    import { format } from 'date-fns';

    const List = styled.ul`
      list-style: none;
      padding: 0;
    `;

    const Item = styled.li`
      background: #2a2a2a;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: fadeIn 0.3s ease;

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;

    const Text = styled.span`
      flex: 1;
      margin-right: 1rem;
    `;

    const Time = styled.span`
      color: #888;
      margin-right: 1rem;
    `;

    const DeleteButton = styled.button`
      background: #ff4444;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #cc0000;
      }
    `;

    const ReminderList = ({ reminders, deleteReminder }) => {
      return (
        <List>
          {reminders.map(reminder => (
            <Item key={reminder.id}>
              <Text>{reminder.text}</Text>
              <Time>{format(new Date(reminder.time), 'dd/MM/yyyy HH:mm')}</Time>
              <DeleteButton onClick={() => deleteReminder(reminder.id)}>
                Delete
              </DeleteButton>
            </Item>
          ))}
        </List>
      );
    };

    export default ReminderList;
