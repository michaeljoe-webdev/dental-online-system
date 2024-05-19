import React, { useState } from 'react';
import './TimeSlots.css';

function TimeSlots({ slots, onSlotSelect }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    onSlotSelect(slot);
  };
  return (
    <div className="time-slots-grid">
      {slots.map((slot, index) => {
        const isNotAvailable = slot.length.includes('Not Available');
        const isSelected = slot.start === selectedSlot && !slot.length.includes('Not Available');
        return (
          <div
            key={index}
            className={`time-slot ${isNotAvailable ? 'not-available' : 'active'} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSlotClick(slot.start)}
          >
            {slot.length}
          </div>
        );
      })}
    </div>
  );
}

export default TimeSlots;
