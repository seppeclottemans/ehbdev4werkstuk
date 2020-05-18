"use strict";

import { getGenres, filterByGenre } from './test_functions';
import { items } from './data';

test('Waneer de getGenres functie wordt uitgevord word verwacht dat men een object terug krijgt met alle verschillende genres in de array van objecten en een aantal van hoeveel keer het genre is voorgekomen.', () => {
  expect(getGenres(items)).toEqual(expect.objectContaining({ '': 1, CONCERT: 6, DANS: 1, THEATER: 2}));
});

test('Waneer de filterByGenre functie wordt uitgevord word verwacht dat men een  array van objecten terug krijgt die een genre bevatten die ook in de genre filter zit.', () => {
  expect(filterByGenre(items)).toEqual(expect.arrayContaining([
    {
      category: 'volwassenen',
      genre: 'concert',
      'genre-v2': 'theater',
      slug: 'test4'
    },
    {
      category: 'familie',
      genre: 'Theater ',
      'genre-v2': 'theater',
      slug: 'test5'
    },
    {
      category: 'familie',
      genre: 'dans ',
      'genre-v2': 'dans',
      slug: 'test6'
    }
  ]));
});