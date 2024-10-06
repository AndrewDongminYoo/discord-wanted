import axios from "axios";
import { WantedResponse } from "./wanted";

export async function run() {
  const response = await axios.get(
    "https://www.wanted.co.kr/api/chaos/navigation/v1/results?1728207345423=&job_group_id=518&job_ids=873&job_ids=872&job_ids=10110&job_ids=669&job_ids=660&country=kr&job_sort=job.recommend_order&years=0&years=5&locations=seoul.all&limit=20&offset=20",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "wanted-user-agent": "user-web",
        "wanted-user-country": "KR",
        "wanted-user-language": "ko",
        Referer: "https://www.wanted.co.kr/wdlist/518",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    },
  );

  const jobs: WantedResponse = response.data;
  console.log(jobs.data);
}

run();
