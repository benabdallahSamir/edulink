import toast from "react-hot-toast";

const toastProps = {
  position: "top-right",
  duration: 1000, // 1 second
  style: {
    background: "#333", // Dark background
    color: "#fff", // White text
  },
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export function errorNotifcation(title) {
  toast.error(title, toastProps);
}
export function successNotifcation(title) {
  toast.success(title, toastProps);
}
