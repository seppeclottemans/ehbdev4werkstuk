# Development 4: Opdracht Werkstuk

# Resources
- Lodash (for various javaScript functions) https://lodash.com
- Tailwindcss (for styling components) https://tailwindcss.com
- axios (for data fetching) https://github.com/axios/axios



# Approach
Alle JavaScript logica gebeurt in de js/main.js file.

1) Haal alle data op van de data/entries.json file. (functie: fetchAllData)
2) Voeg genre buttons toe met een cijfer dat weergeeft hoevaak dit genre bij de bij de items voor komt aan de hand van een reduce functie. (functie: getGenres)
3) Voeg een item card toe aan de html voor elk item. (functie: printAllItems)
4) Wanneer een doelgroep filter word aangeklikt word deze filter toegevoegd in de "targetAudience" array, vervolgens worden de genre knoppen aangepast naar de correcte aantallen rekening houdend met de doelgroep filter. Hierna worden de geschikte items weergegeven die bij de filters behoren.(functies: toggleFilter, filterByAudience, printItemsByFilters)
5) Wanneer een genre filter word aangeklikt word deze filter toegevoegd in de "genreFilters" array en worden de geschikte items weergegeven die bij de filters behoren .(functies: toggleFilter, filterByGenre, printItemsByFilters)
6) Als men op de filters wissen knop drukt worden alle filters uit de array verwijderd en alle items opnieuw weergegeven (functie: removeFilters)

# Tests
1) De test functies staan onder tests/index.test.js
2) Voor de test functies voorzie ik wat basic test data in de tests/data.js file.
3) De JavaScript functies die getest worden staan in de tests/test_functions.js file.
