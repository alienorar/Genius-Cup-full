import axios from 'axios';

// ================ RESULTS GET=================

export async function getResults() {
  const response = await axios.get('https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/filter')
  return response.data;
}

