import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/reducers';
import { addCharacter, removeCharacter, clearCharacters, setCheckedStatus } from '../store/reducers/checkedItemsSlice';
import { Character } from '../components/DetailsComponent/types';
import { RootState, AppDispatch } from '../store/store';

describe('checkedItemsSlice', () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
    dispatch = store.dispatch;
  });

  it('should handle adding a character', () => {
    const character: Character = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    dispatch(addCharacter(character));

    const state = store.getState() as RootState;
    expect(state.checkedItems.items).toHaveLength(1);
    expect(state.checkedItems.items[0]).toEqual(character);
    expect(state.checkedItems.checkedStatus[character.name]).toBe(true);
  });

  it('should handle removing a character', () => {
    const character: Character = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
    };

    dispatch(addCharacter(character));
    dispatch(removeCharacter(character.name));

    const state = store.getState() as RootState;
    expect(state.checkedItems.items).toHaveLength(0);
    expect(state.checkedItems.checkedStatus[character.name]).toBeUndefined();
  });

  it('should handle clearing characters', () => {
    const character1: Character = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    const character2: Character = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male',
    };

    dispatch(addCharacter(character1));
    dispatch(addCharacter(character2));
    dispatch(clearCharacters());

    const state = store.getState() as RootState;
    expect(state.checkedItems.items).toHaveLength(0);
    expect(state.checkedItems.checkedStatus).toEqual({});
  });

  it('should handle setting checked status', () => {
    const character: Character = {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
    };

    dispatch(addCharacter(character));
    dispatch(setCheckedStatus({ name: character.name, isChecked: false }));

    const state = store.getState() as RootState;
    expect(state.checkedItems.items).toHaveLength(1);
    expect(state.checkedItems.items[0]).toEqual(character);
    expect(state.checkedItems.checkedStatus[character.name]).toBe(false);
  });
});
