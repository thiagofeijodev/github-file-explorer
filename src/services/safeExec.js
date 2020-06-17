export default function safeExec(fn, callback) {
  try{
    fn()
  } catch(err) {
    console.error(err)
    callback()
  }
}