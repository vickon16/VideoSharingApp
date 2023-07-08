import moment from "moment";
import axios from "axios";

export const API = axios.create({
  baseURL : process.env.REACT_APP_BACKEND_URL,
  withCredentials : true
})

export const timeAgo = (stamp) => {
  return moment(stamp).startOf("seconds").fromNow();
}