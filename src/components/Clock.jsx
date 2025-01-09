import React, { useState, useEffect } from 'react';
    import styled from 'styled-components';
    import { format } from 'date-fns';

    const ClockContainer = styled.div`
      text-align: center;
      margin: 2rem 0;
      padding: 2rem;
      background: #2a2a2a;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    const Time = styled.div`
      font-size: 4rem;
      font-weight: bold;
      letter-spacing: 2px;
      background: linear-gradient(135deg, #00d2ff, #3a7bd5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `;

    const Clock = () => {
      const [time, setTime] = useState(new Date());

      useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
      }, []);

      return (
        <ClockContainer>
          <Time>{format(time, 'HH:mm:ss')}</Time>
        </ClockContainer>
      );
    };

    export default Clock;
