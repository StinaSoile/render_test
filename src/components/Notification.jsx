let timeoutId
export const Notification = ({ message, setNewMessage }) => {
  if (message.msg === null) {
    return null
  }

  if (timeoutId !== undefined) {
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(() => {
    setNewMessage({ msg: null, err: false })
  }, 5000)
  let className = 'notification'
  if (message.err) className = 'error'
  return <div className={className}>{message.msg}</div>
}
