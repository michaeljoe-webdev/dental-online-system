import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AppointmentForm.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import TimeSlots from '../layouts/TimeSlots';

function AppointmentForm() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const userId = useSelector(state => state.userData.userId);
  const username = useSelector(state => state.userData.username);
  const token = useSelector(state => state.userData.token);
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dentist_id: '',
    date: '',
    start_time: '',
    end_time: '',
    status: ''
  });
  const [error, setError] = useState('');


  const [dentists, setDentists] = useState([]);
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.get(apiUrl + `/dentists`, authHeader);
        setDentists(response.data);
      } catch (error) {
        console.error('Error fetching dentists:', error);
      }
    };
    fetchDentists();
  }, []);

  const [slots, setSlots] = useState([]);

  const checkAvailable = async (dentistId, dateVal) => {
    const date = new Date(dateVal);
    const dayNumber = date.getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = days[dayNumber];
    const dentist = dentists.filter((d)=>{
      if(d.dentist_id == dentistId ){
        if(dayName == 'sunday' && d.sunday == 1 ){
          return d
        } else if(dayName == 'monday' && d.monday == 1 ){
          return d
        } else if(dayName == 'tuesday' && d.tuesday == 1 ){
          return d
        } else if(dayName == 'wednesday' && d.wednesday == 1 ){
          return d
        } else if(dayName == 'thursday' && d.thursday == 1 ){
          return d
        } else if(dayName == 'friday' && d.friday == 1 ){
          return d
        }else if(dayName == 'saturday' && d.saturday == 1 ){
          return d
        } 
      }
      
    })
    return dentist
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if ( (formData.dentist_id && name === 'date') || (formData.date && name === 'dentist_id') ) {
      let response = []
      if(name === 'date'){
        const availDentist = await checkAvailable(formData.dentist_id,value)
        if(availDentist.length == 0){
          response = 'DAY OFF'
        }else{
          response = await axios.get(apiUrl + `/dentists/${formData.dentist_id}/${value}`, authHeader);
        }
      }else if(name === 'dentist_id'){
        const availDentist = await checkAvailable(value,formData.date)
        if(availDentist.length == 0){
          response = 'DAY OFF'
        }else{
          response = await axios.get(apiUrl + `/dentists/${value}/${formData.date}`, authHeader);
        }
      }




      if(response == 'DAY OFF'){
        setSlots([]);

        return setError('Dentist is not available');
      }else{
        setError('');
        const booked = response.data
        const timeSlots = [];
        for (let hour = 8; hour <= 16; hour++) {
          const amPm = hour < 12 ? 'AM' : 'PM';
          const displayHour = hour <= 12 ? hour : hour - 12;
          const startHourString = displayHour > 9 ? `${displayHour}:00 ${amPm}` : `0${displayHour}:00 ${amPm}`;
          const endHourString = displayHour+1 == 13 ? `01:00 ${amPm}` : displayHour+1 > 9 ? `${displayHour+1}:00 ${amPm}` : `0${displayHour+1}:00 ${amPm}`;
          const setRailTime = hour > 9 ? `${hour}:00:00` : `0${hour}:00:00`;
          let status = 'Available';
          if(Array.isArray(booked)){
              booked.forEach(book => {
                  if (book.start_time === setRailTime && book.status === 'booked') {
                  status = 'Not Available';
                  }
              });
          }
          timeSlots.push({
              length: startHourString + ' - ' + endHourString + ' : ' + status,
              start: setRailTime
          });
        }
        setSlots([...timeSlots]);
      }

    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
        formData.start_time = selectedSlot
        if(!formData.start_time){
          return setError('Please select available slot');
        }else{
          const [hour, minute] = selectedSlot.split(':');
          let endHour = (parseInt(hour, 10) + 1);
          endHour = endHour < 10 ? `0${endHour}` : endHour;
          formData.end_time = `${endHour}:${minute}`
          formData.status = 'booked';
          formData.user_id = userId;
          formData.full_name = username
          const response = await axios.post(apiUrl + `/slots`, formData, authHeader);
          const slotData = response.data.newSlot;
          let appointmentFormData = {
              "user_id": slotData.user_id,
              "dentist_id": slotData.dentist_id,
              "slot_id" : slotData.slot_id,
              "appointment_datetime": slotData.date.split('T')[0] + ' ' + slotData.start_time,
              "duration": 60,
              "status": "scheduled",
              "notes": "Routine dental checkup",
              "payment_status": "pending",
              "payment_amount": 0,
              "insurance_information": "",
              "medical_history": "",
              "symptoms": ""
          };      
          await axios.post(apiUrl + `/appointments`, appointmentFormData, authHeader);
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "Booked successful",
              showConfirmButton: false,
              timer: 1000
            });
            navigate('/dashboard');
            setTimeout(location.reload(), 1000);
      
        }
    } catch (error) {
      setError('Dentist is not available');
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className='appointment-form-container'>
      <form onSubmit={handleSubmit} className='appointment-form'>
        <h2>Appointment Reservation</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input 
          type="date" 
          name="date" 
          className="form-input"
          value={formData.date} 
          onChange={handleChange} 
          min={getMinDate()} 
          placeholder="Date" 
          required
        />
        <select 
          name="dentist_id" 
          id="dentist_id" 
          className="form-select-input"
          value={formData.dentist_id} 
          onChange={handleChange} 
          required
        >
          <option value="" disabled>Select your dentist</option>
          {dentists.map(dentist => (
            <option key={dentist.dentist_id} value={dentist.dentist_id}>
              {dentist.name}
            </option>
          ))}
        </select>
        {selectedSlot && <p>Selected Slot: {selectedSlot}</p>}
        <TimeSlots slots={slots} onSlotSelect={handleSlotSelect}/>
        <button type="submit" className="form-button" >Submit</button>

      </form>
    </div>
    </>
  );
}

export default AppointmentForm;
