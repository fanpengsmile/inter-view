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


//给定一个数组，从任意一个数字下标开始，下一个数字是当前下标加上当前下标对应的数字，加起来之后得到一个新的下标
//以此计算如果能够回到最开始的下标，则该数组成环（如果下标大于数组的长度，则对数组长度取余）

function circlArray(arr) {
    let simpleArr = [], arrLen = arr.length;
    for (let i = 0; i < arrLen; i ++) {
        simpleArr.push(arr[i] % arrLen);
    }
    for (let i = 0; i < simpleArr.length; i ++) {
        let index = i, sum = 0, temNum;
        while(index < simpleArr.length) {
            if (simpleArr[index] === 0) {
                break;
            }
            if (temNum === undefined) {
                temNum = simpleArr[index];
            } else if (temNum * simpleArr[index] < 0) {
                break;
            }
            sum = sum + simpleArr[index];
            if (sum === simpleArr.length) {
                return true;
            }
            index = index + simpleArr[index];
        }
        if (sum === simpleArr.length) {
            return true;
        }
    }
    return false;
}

//防抖，触发高频事件，n秒内只会执行一次，n秒内再次触发，则重新计时
function debounce(fn) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, 2000);
    }
}

//节流，高频时间触发，n秒内只会执行一次，会稀释函数的执行频率
function throttle(fn) {
    let canRun = true;
    return function () {
        if (!canRun) {return;}
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, 500);
    }
}

const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise1 {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    function resolve (value) {
      this.status = RESOLVED;
      this.value = value;
    };

    function reject (reason) {
      this.status = REJECTED;
      this.reason = reason;
    };

    executor(resolve.bind(this), reject.bind(this));
  }

  then(onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

function sleep(timeOut) {
    return new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                resolve();
            }, timeOut);
        } catch {
            reject();
        }
    })
}

function promiseAll(promises) {
    let result = [];
    let promiseCount = 0;
    let promisesLength = promises.length;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promisesLength; i ++) {
            Promise.resolve(val).then((res) => {
                promiseCount++;
                result[i] = res;
                if (promisesLength === promiseCount) {
                    return resolve(result);
                }
            }).catch((e) => {
                return reject(e);
            })
        }
    })
}


//全排列
let res = [];
function permute(nums) {
    let track = "";
    backtrack(nums, track);
    return res;
}

function backtrack(nums, track) {
    if (track.length === nums.length) {
        res.push(track);
        return;
    }
    for (let i = 0; i < nums.length; i ++) {
        if (track.indexOf(nums[i]) > -1) {
            continue;
        }
        track = track + (nums[i]);
        backtrack(nums, track);
    }
}

//找零钱
function coinChange (coins, amount) {
    let dp = [];
    dp[0] = 0;
    for (let i = 0; i <= amount; i ++) {
        for (let j = 0; j < coins.length; j ++) {
            let coin = coins[j];
            if (i - coin < 0) {
                continue;
            } else if (i - coin === 0){
                dp[i] = 1;
                break;
            } else {
                if (dp[i] === undefined) {
                    dp[i] = amount * 10;
                }
                dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
            }
        }
    }
    return dp[amount];
}