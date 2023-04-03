// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((e) => e.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const spielbergDramaArr = moviesArray.filter(
    (element) =>
      element.director === "Steven Spielberg" && element.genre.includes("Drama")
  );
  return spielbergDramaArr.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) {
    return 0;
  }

  const avgScore = moviesArray.reduce((a, c) => {
    if (c.score) {
      return a + c.score;
    } else {
      return a;
    }
  }, 0);
  return Math.round((avgScore / moviesArray.length) * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  dramaArr = moviesArray.filter((element) => element.genre.includes("Drama"));
  return scoresAverage(dramaArr);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const sortArr = [...moviesArray];
  return sortArr.sort((a, b) => {
    if (a.year === b.year) {
      if (a.title > b.title) {
        return 1;
      } else if (b.title > a.title) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return a.year - b.year;
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortArr = [...moviesArray].sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (b.title > a.title) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortArr.map((e) => e.title).slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const htominArr = [...moviesArray].map((element) => {
    const timeinChar = element.duration;

    const hours = timeinChar.match(/h/)
      ? parseInt(timeinChar.match(/[0-9]+h/)[0].slice(0, -1))
      : 0;
    const min = timeinChar.match(/min/)
      ? parseInt(timeinChar.match(/[0-9]+min/)[0].slice(0, -3))
      : 0;

    return { ...element, duration: hours * 60 + min };
  });

  return htominArr;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) {
    return null;
  }

  //Optimizing the for loop to only loop through the necessary years
  const allYears = [...moviesArray].map((e) => e.year);
  const allYearsNoDouble = allYears.filter((e, i) => {
    const test = allYears.indexOf(e, i + 1);
    if (test === -1) {
      return true;
    } else {
      return false;
    }
  });

  //Creating an array which will hold objects of year and avg score
  avgArrYear = [];
  for (let i = 0; i < allYearsNoDouble.length; i++) {
    const byYearArr = [...moviesArray].filter(
      (element) => element.year === allYearsNoDouble[i]
    );
    avgArrYear.push({
      year: byYearArr[0].year,
      avgscore: scoresAverage(byYearArr),
    });
  }

  //sorting logic
  const sortAvgArrYear = avgArrYear.sort((a, b) => {
    if (b.avgscore === a.avgscore) {
      return a.year - b.year;
    } else {
      return b.avgscore - a.avgscore;
    }
  });

  return `The best year was ${sortAvgArrYear[0].year} with an average score of ${sortAvgArrYear[0].avgscore}`;
}
