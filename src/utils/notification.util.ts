import { toast, ToastOptions } from 'react-toastify';

const info = (message: string, options?: ToastOptions): void => {
  toast.info(message, options);
}

const success = (message: string, options?: ToastOptions): void => {
  toast.success(message, options);
}

const error = (message: string, options?: ToastOptions): void => {
  toast.error(message, options);
}

const warning = (message: string, options?: ToastOptions): void => {
  toast.warning(message, options);
}
const playNotificationSound = () => {
  const sound = new Audio("/sounds/notification.mp3")
  sound.play()
}

const notificationUtil = { info, success, error, warning, playNotificationSound }

export default notificationUtil;