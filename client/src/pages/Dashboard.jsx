import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Schedules from '../layouts/Schedules';
import axios from 'axios';

function Dashboard() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const username = useSelector(state => state.userData.username);
  const userId = useSelector(state => state.userData.userId);
  const token = useSelector(state => state.userData.token);
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(apiUrl + `/slots/user/`+ userId, authHeader);
        setTimeout(() => {
          setSchedules(response.data);
        }, 5000);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [apiUrl]);

  useEffect(() => {
  }, [schedules]);
  
  return (
    <>
      <div className="dashboard-container">
        <div className="greetings">
            <h2> &nbsp; Welcome { username },
            </h2>
        </div>
        <Schedules schedules={schedules} />
      </div>
    </>
  );
}

export default Dashboard;
