
console.log("common.js");

export function aa() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var aa = '222';
            if(aa == "0"){
                resolve(aa)
            }else {
                reject(aa)
            }
        },500)
        
    })
}