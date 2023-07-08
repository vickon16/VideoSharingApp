export const createError = (status, message) => {
  const err = new Error()
  err.status = status;
  err.message = message;

  return err;
}

export const createSuccess = (data, message, status) => {
  return {
    data : data || null,
    message,
    status : status || 200,
  }
}