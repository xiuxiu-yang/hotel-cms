export default function(fn, wait) {
  let previous = 0
   return () => {
     let start = Date.now()
     const args = arguments
     if (start - previous > wait) {
       fn.apply(this, args)
       previous = start
     }
   }
}