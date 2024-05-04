// rootReducer.js
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

// valitse filtteröidyt anekdootit
export const selectFilteredAnecdotes = (state) => {
  const filter = state.filter;
  const anecdotes = state.anecdotes;

  if (!filter) {
    return anecdotes;
  }

  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  // yhdistä reducerit
});

export default rootReducer;
