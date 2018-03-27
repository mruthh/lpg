// argument will have form of {solution, count}
const pointValues = {
  expert: 1000,
  hard: 500,
  medium: 300,
  easy: 100,
  consecutive: 200
}

const calculateScore = (solutionAndCount) => {
  let score = 0;
  let solution = solutionAndCount.solution;
  let count = solutionAndCount.count;
  if (count < 10) {
    score += pointValues.expert;
  } else if (count < 100){
    score += pointValues.hard;
  } else if (count < 1000) {
    score += pointValues.medium;
  } else {
    score += pointValues.easy;
  }

  if (solution.consecutive) {
    score += pointValues.consecutive;
  }

  return score;
  
}


export default calculateScore;