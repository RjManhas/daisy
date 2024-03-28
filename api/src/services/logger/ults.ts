import os from "os";
import { format } from "date-fns";

const getInfo = () => {
  const data = {
    hostname: os.hostname(),
    date: format(new Date(), "MM/dd/yyyy/H:mm:ss"),
  };

  return data;
};

export { getInfo };
