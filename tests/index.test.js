"use strict";

import { getGenres } from './test_functions';
import { items } from './data';

test('Waneer de getGenres functie wordt uitgevord word verwacht dat men een object terug krijgt met alle verschillende genres in de array van objecten en een aantal van hoeveel keer het genre is voorgekomen', () => {
  expect(getGenres(items)).toEqual(expect.objectContaining({ '': 1, CONCERT: 6, THEATER: 2 }));
});