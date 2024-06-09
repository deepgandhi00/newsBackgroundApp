// TODO: sample custom hook for logic
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  fetchIsLoggedIn,
  setIsLoggedIn,
} from '../../../../application/redux/slices/appSlice';

export const useFetchIsLoggedIn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIsLoggedIn());
    setTimeout(() => dispatch(setIsLoggedIn(true)), 3000);
  }, []);
};
