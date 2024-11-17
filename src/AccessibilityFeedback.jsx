// 建议做成表单，并考虑权限管理（指定权限的人才可以允许上传数据）
import React, { useState } from 'react';

const AccessibilityFeedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({
    isAccessible: null,
    isWidthSufficient: null,
    isStaffFriendly: null,
  });

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (question, value) => {
    setFeedback((prev) => ({ ...prev, [question]: value }));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="font-bold mb-2">无障碍信息反馈</h3>
      <div className="mb-4">
        <span>综合评分：</span>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
            className={`cursor-pointer ${rating >= value ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            ★
          </span>
        ))}
      </div>
      <div className="mb-4">
        <p>出口是否平坦无障碍？</p>
        <button onClick={() => handleFeedbackChange('isAccessible', true)}>👍</button>
        <button onClick={() => handleFeedbackChange('isAccessible', false)}>👎</button>
      </div>
      <div className="mb-4">
        <p>出口是否有足够的宽度（80cm以上）？</p>
        <button onClick={() => handleFeedbackChange('isWidthSufficient', true)}>👍</button>
        <button onClick={() => handleFeedbackChange('isWidthSufficient', false)}>👎</button>
      </div>
      <div className="mb-4">
        <p>工作人员是否亲切热心？</p>
        <button onClick={() => handleFeedbackChange('isStaffFriendly', true)}>👍</button>
        <button onClick={() => handleFeedbackChange('isStaffFriendly', false)}>👎</button>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded">提交反馈</button>
    </div>
  );
};

export default AccessibilityFeedback; 