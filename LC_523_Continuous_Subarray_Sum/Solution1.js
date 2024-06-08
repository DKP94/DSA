/*
Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:

its length is at least two, and
the sum of the elements of the subarray is a multiple of k.
Note that:

A subarray is a contiguous part of the array.
An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.
 

Example 1:

Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
Example 2:

Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
Example 3:

Input: nums = [23,2,6,4,7], k = 13
Output: false
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
0 <= sum(nums[i]) <= 231 - 1
1 <= k <= 231 - 1
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
    var sumArr = new Array(nums.length);
    var hm = {};
    sumArr[0] = nums[0];
    hm[sumArr[0]%k] = 0;
    for(let i=1; i< nums.length; i++){
        
        if(nums[i]==0 && nums[i-1]==0) return true;
        sumArr[i] = sumArr[i-1]+nums[i]; 
        
        if(sumArr[i]%k == 0) return true;        
        else if(hm[sumArr[i]%k]!=undefined){
           if(i - hm[sumArr[i]%k] > 1) return true;
        }
        else hm[sumArr[i]%k] = i;      
    }    
    return false;
};

/* Intuition
The problem requires finding a continuous subarray of size at least two that sums to a multiple of a given integer ( k ). 
The key insight here is to use the properties of modular arithmetic:
if the sum of elements from index ( i ) to ( j ) (inclusive) is a multiple of ( k ), then the cumulative sum up to ( j ) modulo ( k ) should equal the cumulative sum up to ( i-1 ) modulo ( k ).

Approach
Use a hash map to store the first occurrence of each cumulative sum's remainder when divided by ( k ). This allows us to quickly check if a subarray with the desired properties exists.
Initialize the hash map with the remainder 0 at index -1 to handle cases where the valid subarray starts from the beginning.
Iterate through the array, maintaining the cumulative sum and calculating the remainder when the sum is divided by ( k ).
If the remainder has been seen before, check if the subarray length is at least 2. If so, return true.
If the remainder is not in the map, store the current index associated with this remainder.
If no valid subarray is found after iterating through the array, return false.
Complexity
Time complexity:
The algorithm runs in ( O(n) ) time, where ( n ) is the length of the input array, since each element is processed once.

Space complexity:
The space complexity is ( O(\min(n, k)) ) since the hash map can contain at most ( k ) distinct remainders.
*/
Code
/**
 * Checks if the array has a continuous subarray of size at least two 
 * that sums up to a multiple of k.
 * 
 * @param {number[]} nums - The input array of integers.
 * @param {number} k - The integer to check the sum multiple against.
 * @return {boolean} - Returns true if such a subarray exists, otherwise false.
 */
var checkSubarraySum = function(nums, k) {
    // Initialize the sum and a map to store the first occurrence of remainders.
    let sum = 0;
    const remainderMap = new Map();
    remainderMap.set(0, -1); // Initialize the map with remainder 0 at index -1.

    // Loop through the array.
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]; // Increment the sum by the current element.
        
        // Calculate the remainder of the sum with respect to k.
        const remainder = sum % k;
        
        // Adjust remainder to be non-negative.
        const adjustedRemainder = remainder < 0 ? remainder + k : remainder;
        
        // If the remainder has been seen before.
        if (remainderMap.has(adjustedRemainder)) {
            // Check if the subarray length is at least 2.
            if (i - remainderMap.get(adjustedRemainder) > 1) {
                return true; // Valid subarray found.
            }
        } else {
            // Store the first occurrence of the remainder.
            remainderMap.set(adjustedRemainder, i);
        }
    }

    return false; // No valid subarray found.
};

// Example usage:
// const nums = [23, 2, 4, 6, 7];
// const k = 6;
// console.log(checkSubarraySum(nums, k)); // Output: true
