import { ref } from 'vue'
export default function () {
  const identifyCodes = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
  let identifyCode = ref("");
  const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const refreshCode = () => {
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
  };
  const makeCode = (o, l) => {
    for (let i = 0; i < l; i++) {
      //随机字符串拼接
      identifyCode.value += o[randomNum(0, o.length)];
    }
  };

  return [identifyCode, refreshCode]
}