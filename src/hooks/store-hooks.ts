import type { AppDispatch, State } from '@src/entities/state';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

// обертка над хуками редакса для типизации и подсказок
// можно заменить на withTypes после обновления redux-toolkit > 2.1
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
