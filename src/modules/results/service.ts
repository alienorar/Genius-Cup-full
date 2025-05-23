import { Params } from 'react-router-dom';
import axiosInstance from '../../api';
import axios from 'axios';


// ================ GET 1 STAGE RESULTS =================
export async function getResults(params) {
  const response = await axios.post('https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/filter', {
    params,
  });
  return response.data;
}
// ================ GET 2 STAGE RESULTS =================
export async function getSecondResults(params:Params) {
  const response = await axios.get('https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/filter', {
    params,
  });
  return response.data;
}

// ================ GET REGIONS =================
export async function getRegions() {
  const response = await axios.get('https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/region/list')
  return response.data;
}


export async function getSingleResult(chatId: string | number) {
  const response = await axios.get('https://gc-bot-admin-api.asianuniversity.uz/api/v1/front/user/score', {
    params: { chatId },
  });

  return response.data.data;
}


// services/resultService.ts

interface GetOtherCountryResultsParams {
  page: number;
  limit: number;
  testId: number;
  regionId: number;
  token: string;
}

export async function getOtherCountryResults({
  page,
  limit,
  testId,
  regionId,
  token,
}: GetOtherCountryResultsParams) {
  const response = await axiosInstance.post(
    `/test/admin/filter?page=${page}&limit=${limit}`,
    {
      testId,
      region_id: regionId,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
}
