import Axios from "axios";
import { Equal } from "./equal";

const BASE_URL = "https://api.sms-activate.org/stubs/handler_api.php";
const WAIT_TIMEOUT = 3000;
const MAX_TIMEOUT = 240000;

export class ServiceOverseer {
  constructor(
    private accessToken: string,
    private id: string,
    private phone: string
  ) {}

  get phoneNumber() {
    return this.phone;
  }

  async cancel() {
    const response = await Axios.get(BASE_URL, {
      params: {
        api_key: this.accessToken,
        action: "setStatus",
        status: 8,
        id: this.id,
      },
    });

    Equal(response.data);
  }

  async message(regular: string | RegExp, replaceValue: string = "") {
    const defender = setTimeout(async () => {
      await this.cancel();
      throw new Error("Waiting time out");
    }, MAX_TIMEOUT);

    await Axios.get(BASE_URL, {
      params: {
        api_key: this.accessToken,
        action: "setStatus",
        status: 1,
        id: this.id,
      },
    });

    while (true) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          return resolve();
        }, WAIT_TIMEOUT);
      });

      const response = await Axios.get(BASE_URL, {
        params: {
          api_key: this.accessToken,
          action: "getStatus",
          id: this.id,
        },
      });

      const [targetId] = response.data.split(":");

      Equal(targetId);

      if (targetId === "STATUS_OK") {
        clearTimeout(defender);

        const message = response.data.substring(response.data.indexOf(":") + 1);
        return message.replace(regular, replaceValue);
      }
    }
  }

  async done() {
    await Axios.get(BASE_URL, {
      params: {
        api_key: this.accessToken,
        action: "setStatus",
        status: 6,
        id: this.id,
      },
    });
  }
}
