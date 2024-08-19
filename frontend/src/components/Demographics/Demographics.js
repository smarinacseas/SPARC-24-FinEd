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
    <div className="demographics-container">
      <div className="form-box">
        <h3>User Information</h3>
        <p>Please answer the below questions with as much specificity as you feel comfortable with:</p>

        <form className="demographics-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              className="limited-input"
              onChange={handleChange}
              maxLength={100} // Limit to 100 characters
            />
          </div>
          <div>
            <label htmlFor="income_level">Income Level:</label>
            <input
              type="number"
              name="income_level"
              className="limited-input"
              onChange={handleChange}
              maxLength={100} // Limit to 100 characters
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select name="gender" className="limited-input" onChange={handleChange}>
                <option value="">Select from Dropdown</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
            </select>
            </div>
          <div>
            <label htmlFor="financial_responsibilities">What are your current financial responsibilities <br/> (e.g., dependents, mortgage)?</label>
            <input
              type="text"
              name="financial_responsibilities"
              className="limited-input"
              onChange={handleChange}
              maxLength={100} // Limit to 100 characters
            />
          </div>
          <div>
            <label htmlFor="savings_investments">Can you describe your current savings and investment status?</label>
            <input
              type="text"
              name="savings_investments"
              className="limited-input"
              onChange={handleChange}
              maxLength={100} // Limit to 100 characters
            />
          </div>
          <div>
            <label htmlFor="debt_status">Can you describe your current debt situation?</label>
            <input
              type="text"
              name="debt_status"
              className="limited-input"
              onChange={handleChange}
              maxLength={100} // Limit to 100 characters
            />
          </div>
          <div>
            <label htmlFor="financial_goals">What are your financial goals?</label>
            <input
              type="text"
              name="financial_goals"
              className="limited-input"
              onChange={handleChange}
              maxLength={100} // Limit to 100 characters
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Demographics;