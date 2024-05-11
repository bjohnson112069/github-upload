/*
    The idea is to first sort the array and find the longest subarray with consecutive elements. After sorting the array and removing the multiple occurrences of elements, run a loop and keep a count and max (both initially zero). Run a loop from start to end and if the current element is not equal to the previous (element+1) then set the count to 1 else increase the count. Update max with a maximum of count and max. 

*/

function longestConsecutiveSequence(arr) {
  let valuesSoFar = Object.create(null);
  let countValue = 1; 
  let maxcountValue = 1

  const result = arr.sort((a, b) => a > b)
    .filter((item , i, array) => {
      let value = array[i];
      if (value in valuesSoFar) {
          return false; /* do NOT keep */
      }
      valuesSoFar[value] = true;
      return true; /* keep */
    }).reduce((max, item , i, array) => {
      if (array[i - 1] + 1 === array[i]) { 
        countValue++; 
      } else if (array[i - 1] !== array[i]) { 
        countValue = 1; 
      } 
      maxcountValue = Math.max(maxcountValue, countValue);
      return maxcountValue; 
    }, 0);

  return result;
}

console.log('Output:', longestConsecutiveSequence([100, 4, 200, 1, 3, 2]));
console.log('Output:', longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
console.log('Output:', longestConsecutiveSequence([]));
console.log('Output:', longestConsecutiveSequence([10, 5, 12, 3]));

