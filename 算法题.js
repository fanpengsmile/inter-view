//将特定的字符或数字移动到数组最后，不改变其他item的顺序
/**
 * eg:
 * input: [1,2,6,3,4,2,5,3,2,1,2] , 2
 * 将数组中的2移动到最后
 * output: [1,6,3,4,5,3,1,2,2,2,2]
 * 不能使用数组的方法，不如slice，或者splice等
 * 时间复杂O(1),空间复杂度O(n)
 */
function sort (arr, num) {
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            index ++;
            continue;
        }
        if (index > 0) {
            arr[i - index] = arr[i];
            arr[i] = num;
        }
    }
    return arr;
}