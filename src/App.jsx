import React, { useState, useEffect } from 'react';
    import styled from 'styled-components';
    import Clock from './components/Clock';
    import ReminderForm from './components/ReminderForm';
    import ReminderList from './components/ReminderList';
    import Auth from './components/Auth';
    import { format, isBefore } from 'date-fns';
    import { supabase } from './lib/supabaseClient';

    const Container = styled.div`
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #fff;
    `;

    const App = () => {
      const [reminders, setReminders] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [session, setSession] = useState(null);

      useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
          setSession(session);
          if (session) fetchReminders();
        });

        const currentSession = supabase.auth.getSession();
        setSession(currentSession);
        if (currentSession) fetchReminders();
      }, []);

      const fetchReminders = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('reminders')
            .select('*')
            .order('created_at', { ascending: true });

          if (error) throw error;
          setReminders(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      const addReminder = async (text, time) => {
        try {
          const { data, error } = await supabase
            .from('reminders')
            .insert([{ 
              text, 
              time: format(new Date(time), "yyyy-MM-dd'T'HH:mm"),
              user_id: session?.user?.id
            }])
            .single();

          if (error) throw error;
          setReminders(prev => [...prev, data]);
        } catch (err) {
          setError(err.message);
        }
      };

      const deleteReminder = async (id) => {
        try {
          const { error } = await supabase
            .from('reminders')
            .delete()
            .eq('id', id);

          if (error) throw error;
          setReminders(prev => prev.filter(reminder => reminder.id !== id));
        } catch (err) {
          setError(err.message);
        }
      };

      return (
        <Container>
          <Clock />
          {!session ? (
            <Auth />
          ) : (
            <>
              <ReminderForm addReminder={addReminder} />
              {loading ? (
                <p>Loading reminders...</p>
              ) : error ? (
                <p style={{ color: '#ff4444' }}>Error: {error}</p>
              ) : (
                <ReminderList reminders={reminders} deleteReminder={deleteReminder} />
              )}
              <button 
                onClick={() => supabase.auth.signOut()}
                style={{
                  marginTop: '2rem',
                  background: '#ff4444',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </>
          )}
        </Container>
      );
    };

    export default App;
