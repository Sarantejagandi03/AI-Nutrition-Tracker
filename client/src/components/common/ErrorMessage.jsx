const ErrorMessage = ({ message, className = "" }) => {
  if (!message) {
    return null;
  }

  return <p className={`rounded-md bg-red-50 p-3 text-sm font-medium text-red-700 ${className}`}>{message}</p>;
};

export default ErrorMessage;
