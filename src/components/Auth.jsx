import React, { useState } from 'react';
    import styled from 'styled-components';
    import { supabase } from '../lib/supabaseClient';

    const AuthContainer = styled.div`
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
    `;

    const Input = styled.input`
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    `;

    const Button = styled.button`
      width: 100%;
      padding: 0.8rem;
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

    const Auth = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [isLogin, setIsLogin] = useState(true);

      const handleAuth = async (e) => {
        e.preventDefault();
        setError('');

        try {
          const { error } = isLogin
            ? await supabase.auth.signInWithPassword({ email, password })
            : await supabase.auth.signUp({ email, password });

          if (error) throw error;
        } catch (err) {
          setError(err.message);
        }
      };

      return (
        <AuthContainer>
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleAuth}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            {error && <Error>{error}</Error>}
          </form>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: '#00d2ff', cursor: 'pointer' }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </AuthContainer>
      );
    };

    export default Auth;
