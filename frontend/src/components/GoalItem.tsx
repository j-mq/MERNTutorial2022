import React from 'react';
import { Goal } from '../features/goals/goalsService';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch } from '../app/hooks';
import { deleteGoal } from '../features/goals/goalsSlice';

interface GoalItemProps {
  goal: Goal;
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button className='close' onClick={() => dispatch(deleteGoal(goal._id))}>
        <FaTimes />
      </button>
    </div>
  );
};

export default GoalItem;
