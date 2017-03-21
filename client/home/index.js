require("./index.scss");
import {aa} from '../common/common'

console.log("client/home/index.js");


aa().then((aa) =>{ console.log(aa)}).catch((aa) => console.info(aa))
const str = 'ES6 now11212222';
console.log(`Hello ${str}`);

var drawEl = document.getElementById("draw");
drawEl.innerHTML = "peko1";

// Uncomment these to enable hot module reload for this entry.
// if (module.hot) {
//   module.hot.accept();
// }
