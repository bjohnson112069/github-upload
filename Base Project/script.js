function maxSubarraySum(arr) {
  const INT_MIN = arr[0];
  let maxSoFar = INT_MIN;
  let maxEndingHere = 0;

  for (let i = 0; i < arr.length; i++) {
    maxEndingHere += arr[i];

    if (maxSoFar < maxEndingHere) maxSoFar = maxEndingHere;

    if (maxEndingHere < 0) maxEndingHere = 0;
  }

    return maxSoFar;
  
}
 
// console.log('Output:', caesarCipher(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`, 1));
console.log('Output:', maxSubarraySum([2, -3, 2, 3, 4, -1]));
