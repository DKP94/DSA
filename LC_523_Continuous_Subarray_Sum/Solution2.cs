/* LC link : https://leetcode.com/problems/continuous-subarray-sum/description/

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


public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        var sum = nums[0];
        var dict = new Dictionary<int, int>();
        dict.Add(nums[0]%k, 0);
        for(var i=1; i<nums.Length; i++){
            if(nums[i] == 0 && nums[i-1]==0) return true;
            sum += nums[i];
            if(sum%k == 0) return true;

            if(!dict.ContainsKey(sum%k)) dict.Add(sum%k,i);
            else if(i-dict[sum%k] > 1) return true;            
        }
        return false;
    }
}


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

public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        var sum = 0;
        var dict = new Dictionary<int, int>();
        sum = nums[0];
        dict.Add(nums[0]%k, 0);
        for(var i=1; i<nums.Length; i++){
            if(nums[i] == 0 && nums[i-1]==0) return true;
            sum += nums[i];

            if(sum%k == 0) return true;
            else if(dict.ContainsKey(sum%k)){
                if(i-dict[sum%k] > 1) return true;
            }
            else dict.Add(sum%k,i);
        }
        return false;
    }
}
