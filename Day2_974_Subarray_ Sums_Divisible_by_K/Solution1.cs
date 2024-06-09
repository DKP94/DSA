public class Solution {
    public int SubarraysDivByK(int[] nums, int k) {
        int sum = 0;
        int count = 0;
        int[] hm = new int[k];
        hm[0] = 1;
        for(int i=0; i<nums.Length; i++){
            sum+=nums[i];
            int r = ((sum%k)+k)%k; // Same as var r = sum%k>= 0? sum%k : (sum%k)+k;  
            if(hm[r] > 0) count+=hm[r]; 
            hm[r]+=1;
        }
        return count;
    }
}
