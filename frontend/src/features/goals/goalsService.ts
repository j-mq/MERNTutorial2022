import axios from 'axios';

const API_URL = '/api/goals/';

export interface Goal {
  user: string;
  text: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

//Create new goal
const createGoal = async (goalData: { text: string }, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//Get user goals
const getGoals = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data as Goal[];
};

//Delete goal
const deleteGoal = async (goalId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const goalsService = { createGoal, getGoals, deleteGoal };

export default goalsService;
