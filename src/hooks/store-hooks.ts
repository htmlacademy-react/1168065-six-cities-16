import { AppDispatch, State } from '@src/entities/state';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// обертка над хуками редакса для типизации и подсказок
export const useAppDispatch = () => useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
