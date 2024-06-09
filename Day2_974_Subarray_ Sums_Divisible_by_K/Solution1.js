/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function(nums, k) {
    var sum = 0;
    var hm = new Array(k);
    var count = 0;
    for(var i=0; i<nums.length; i++){
        sum+=nums[i];
        var r = sum%k;
        r = r>=0 ? r : r+k;  // same as int r = ((sum%k)+k)%k;      
        if(hm[r]) {
            count+=hm[r];
            hm[r]+=1;
        }
        else {
            hm[r] = 1;
        }
        if(r==0) count++;
    }
    return count
};
