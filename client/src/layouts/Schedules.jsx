import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Schedules.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const Schedules = ({ schedules }) => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = useSelector(state => state.userData.token);
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    schedules.sort((a, b) => {
        const dateComparison = new Date(a.date) - new Date(b.date);
        if (dateComparison === 0) {
        return a.start_time.localeCompare(b.start_time);
        }
        return dateComparison;
    });

    const handleSlotClick = async (schedule) => {
        if(schedule.status == 'cancelled'){
            return false;
        }
        const detail = schedule.date.split('T')[0] + ' : ' + schedule.start_time + ' - ' + schedule.end_time + ' with ' + schedule.name
        Swal.fire({
            title: "<strong>Do you want to <span style='color:red'>cancel</span> appointment?</strong>",
            icon: "question",
            html: `
            ${detail}
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
            Cancel Appointment
            `,
            cancelButtonText: `
            Close
            `,
        }).then( async (result) => {
            if (result.isConfirmed) {
                await axios.post(apiUrl + `/appointments/cancel`,schedule,authHeader);
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cancelled successful",
                    showConfirmButton: false,
                    timer: 1000
                });
                setTimeout(location.reload(), 1000);
            }
        });;
    };

  return (
    <div className="schedule-container">
        <h1>Your Schedules</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Doctor</th>
                    <th>Status</th>
                </tr>
            </thead>
            {schedules.length === 0 ? (
                <tbody>
                <tr>
                    <td colSpan={4}> Gathering your appointment schedules. . . </td>
                    </tr>
                </tbody>
            ) : (
                schedules.map((schedule, index) => {
                    const status = schedule.status == 'cancelled' ? 'isCancelled' : 'isBooked' 
                return (
                            <tbody>
                                <tr key={index} onClick={() => handleSlotClick(schedule)} className={status} >
                                    <td>{ schedule.date.split('T')[0] }</td>
                                    <td>{ schedule.start_time + ' - ' + schedule.end_time }</td>
                                    <td>{ schedule.name }</td>
                                    <td>{ schedule.status }</td>
                                </tr>
                            </tbody>
                        
                );
                })
            )}
      </table>

        <div className="legend">
            <div className="legend-item">
                <div className="legend-color legend-booked"></div>
                <span>Booked</span>
            </div>
            <div className="legend-item">
                <div className="legend-color legend-cancelled"></div>
                <span>Cancelled</span>
            </div>
        </div>
        <br/>
      <button className='appointment-button'>
        <Link className='appointment-text' to="/appointments" >Book An Appointment</Link>
        </button>
    </div>
  );
};

export default Schedules;
