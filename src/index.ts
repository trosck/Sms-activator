import Axios from "axios";
import { Equal } from "./equal";
import { ServiceOverseer } from "./overseer";

const BASE_URL = "https://api.sms-activate.org/stubs/handler_api.php";

export class Sink {
  constructor(private accessToken: string) {}

  async balance() {
    const response = await Axios.get(BASE_URL, {
      params: {
        api_key: this.accessToken,
        action: "getBalance",
      },
    });

    const [targetId, balance] = response.data.split(":");

    Equal(targetId);

    return {
      raw: response.data,
      balance: parseFloat(balance),
      currency: "RUB",
    };
  }

  async serviceInfo() {
    const response = await Axios.get(BASE_URL, {
      params: {
        api_key: this.accessToken,
        action: "getPrices",
        service: "ot",
        country: 0,
      },
    });

    Equal(response.data);

    const { cost, count } = response.data["0"]["ot"];

    return {
      price: cost,
      currency: "RUB",
      stock: count,
    };
  }

  async lease(): Promise<ServiceOverseer> {
    const response = await Axios.get(BASE_URL, {
      params: {
        api_key: this.accessToken,
        action: "getNumber",
        service: "ot",
        forward: 0,
      },
    });

    const [targetId, id, phone] = response.data.split(":");

    Equal(targetId);

    console.log(`[SMS] Leasing phone nubmber with status ${targetId}`);

    return new ServiceOverseer(this.accessToken, id, phone);
  }
}
