Question
Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
Example 2:

Input: nums = [5], k = 9
Output: 0
 

Constraints:

1 <= nums.length <= 3 * 104
-104 <= nums[i] <= 104
2 <= k <= 104



Solution : 
This question is an extension for the question 523. Continuous Subarray Sum, so i would highly recommend to solve the question the first, if you can solve that question, it is a piece of cake.

If you are getting confused, or getting any error, you can check out my solution for the previous problem How to approach this question (Thought Process).

Now, let's continue with the current question.

Brute force Approach
First of all, let's talk about the brute-force approach where we calculate the sum of all subarrays and then check if our element k divides that sum and if it does, we increment the subarrays count by 1.
Its so simple, easy and it works also, the only problem is that it has O(n^2) time complexity. So you will get Time limit Exceeded errors if you try to solve the question this way

Optimized :
Step-by-Step Thought Process with Detailed Example
Cumulative Sum 🏃‍♂️

Concept: As you traverse through the array, keep a running total of the sum of the elements you have encountered so far. This is known as the cumulative sum 😊.
Example: For an array [2, 5, 7], the cumulative sums would be [2, 7, 14].
Remainders ➗

Concept: For each cumulative sum, calculate the remainder when it is divided by k. The remainder helps us determine if the sum of any subarray (up to the current index) is a multiple of k.

Why Remainders Help (IMPORTANT!!) 🟢🟢🟢

Concept: If at two different points in the array, the cumulative sums give the same remainder when divided by k, it means the sum of the elements between these two points is a multiple of k.
Example: If dividing 7 by 5 gives a remainder of 2, and dividing 12 by 5 also gives a remainder of 2, then the difference between these sums (12 - 7 = 5) must be divisible by 5.
Using a Map for Remainders 🤨

Concept: Use a map (dictionary) to store the frequency of each remainder.
Why: This allows us to quickly check how many times a particular remainder has occurred, helping us count the number of valid subarrays.
Handling Negative Remainders (IMPORTANT) 🟢🟢🟢

Concept: If the remainder is negative, adjust it by adding k.

When dividing -3 by 5, the remainder is -3, and when dividing 2 by 5, the remainder is 2. The difference between these remainders is (2 - (-3) = 5), which is divisible by 5. However, the remainders -3 and 2 do not match, leading to potential errors in calculations.

To solve this, we can adjust the negative remainder by adding the divisor 5 to -3, resulting in -3 + 5 = 2. Now, the remainders match, ensuring correct results. 🥳🥳

Initial HashMap Entry (Confusion Point) 🔴🔴

Concept: Initialize the map with a remainder of 0 having a count of 1.
Why: This accounts for subarrays that start from the beginning and have a sum directly divisible by k. Without this, we would miss counting those subarrays.
Example: (If we don't put (0, 1)), Let's take array as [15, 10] and k as 5 now for the sum at (index = 0) we get remainder as 15 % 5 = 0, but when we will try to find 0 in our hashmap we wont able to find it 🥺, since we never encountered 0 before, and thus it will lead to wrong result. (YOU JUST MISSED A VALID SUBARRAY 🫨).
Complexity
Time complexity O(n)O(n)O(n)
The for loop runs from 0 to nums.length - 1, so it iterates
n times, where n is the length of the input array nums. Therefore, the loop itself has a time complexity of O(n)O(n)O(n).
Inside the loop, the operations performed (adding to currentSum, calculating remainder, checking and updating remainders map) are all constant time operations, O(1)O(1)O(1).
Given that the loop runs nnn times and each iteration involves constant time operations, the overall time complexity is O(n)O(n)O(n)
Space complexity O(k)O(k)O(k)
The remainders HashMap stores remainder values as keys and their counts as values. In the worst case, we might store k entries in the HashMap (since there are only k possible remainders from 0 to k−1).
Hence, the space complexity for the HashMap can go up to O(k).

Instead of HashMap array can also be used. Small little Better for time and space complexity. Array length max goes to o(k);



