import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Demographics.css'; // Import the CSS file for styling

const Demographics = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('user_id'); // Assume user_id is stored after login
      const response = await api.post('/info', { user_id: userId, answers });
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error saving demographics:', error);
    }
  };

  return (
    <div>
      <h3>User Information</h3>
      Please answer the below questions with as much specificity as you feel comfortable with:

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            className="limited-input" // Apply the class
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            name="gender"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="education_level">Education Level:</label>
          <input
            type="text"
            name="education_level"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="income_level">Income Level:</label>
          <input
            type="text"
            name="income_level"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="marital_status">Marital Status:</label>
          <input
            type="text"
            name="marital_status"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="financial_goals">Financial Goals:</label>
          <input
            type="text"
            name="financial_goals"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="financial_literacy_level">Financial Literacy Level:</label>
          <input
            type="text"
            name="financial_literacy_level"
            className="limited-input"
            onChange={handleChange}
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Demographics;