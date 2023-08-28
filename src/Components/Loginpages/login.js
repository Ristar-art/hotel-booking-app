import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setLoading, setError } from './loginSlice'; 
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getIdToken } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function Login() {
   
  const dispatch = useDispatch();
  const Email = useSelector((state) => state.Login.email);
  const password = useSelector((state) => state.Login.password);
  const loading = useSelector((state) => state.Login.isLoading);
  const error = useSelector((state) => state.Login.error);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
  
    try {
      await signInWithEmailAndPassword(auth, Email, password);
      alert('Login successful');
  
      const user = auth.currentUser;
      if (user) {
        const token = await getIdToken(user);
        localStorage.setItem('accessToken', token)  
        navigate("/");
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in. Please try again later.');
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="Login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={Email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <br />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
