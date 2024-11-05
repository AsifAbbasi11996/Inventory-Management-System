import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import '../assets/styles/FilterDropdown.css'

const FilterDropdown = ({ onFilterSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [customDate, setCustomDate] = useState('');

    const handleFilterSelect = (filter) => {
        onFilterSelect(filter);
        setIsOpen(false);
    };

    const handleCustomDateSubmit = (e) => {
        e.preventDefault();
        onFilterSelect(customDate); // Send custom date to the parent
        setCustomDate('');
    };

    return (
        <div className="filter-dropdown">
            <div className="dropdown-icon" onClick={() => setIsOpen(!isOpen)}>
                <BsThreeDotsVertical />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li onClick={() => handleFilterSelect('today')}>Today</li>
                        <li onClick={() => handleFilterSelect('yesterday')}>Yesterday</li>
                        <li onClick={() => handleFilterSelect('lastWeek')}>Last Week</li>
                        <li onClick={() => handleFilterSelect('lastMonth')}>Last Month</li>
                        <li onClick={() => handleFilterSelect('lastYear')}>Last Year</li>
                    </ul>
                    <form onSubmit={handleCustomDateSubmit}>
                        <input
                            type="date"
                            value={customDate}
                            onChange={(e) => setCustomDate(e.target.value)}
                            required
                        />
                        <button type="submit">Filter By Date</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
