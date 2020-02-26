import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';
import moment from "moment";
import 'moment/locale/de';


const CurrentWeekPicker = () => {

    const dispatch = useDispatch();
    const [hoverRange, setHoverRange] = useState(undefined)
    const [selectedDays, setSelectedDays] = useState(getWeekDays(getWeekRange(new Date()).from)) //initial week = actual current week
    const [modal, setModal] = useState(false);

    dispatch({type: "SET_CURRENT_WEEK", currentWeek: selectedDays})

    const toggle = () => {
        setModal(!modal);
        dispatch({type: "SET_CURRENT_WEEK", currentWeek: selectedDays})
    }

    const handleDayChange = date => {
        setSelectedDays(getWeekDays(getWeekRange(date).from))
    };

    const handleDayEnter = date => {
        setHoverRange(getWeekRange(date))
    };

    const handleDayLeave = () => {
        setHoverRange(undefined)
    };

    const handleWeekClick = (weekNumber, days, e) => {
        setSelectedDays(days)
    };

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
        hoverRange,
        selectedRange: daysAreSelected && {
            from: selectedDays[0],
            to: selectedDays[6],
        },
        hoverRangeStart: hoverRange && hoverRange.from,
        hoverRangeEnd: hoverRange && hoverRange.to,
        selectedRangeStart: daysAreSelected && selectedDays[0],
        selectedRangeEnd: daysAreSelected && selectedDays[6],
    };


    return (
        <div>
            <button className={"weekDayPicker"} onClick={toggle}>
                {selectedDays.length === 7 && (
                    <div>
                        {moment(selectedDays[0]).format('LL')} – {' '}
                        {moment(selectedDays[6]).format('LL')}
                    </div>
                )}
            </button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Select a week</ModalHeader>
                <ModalBody>
                    <DayPicker selectedDays={selectedDays}
                               locale={'de'}
                               firstDayOfWeek={1}
                               showWeekNumbers
                               showOutsideDays
                               modifiers={modifiers}
                               onDayClick={handleDayChange}
                               onDayMouseEnter={handleDayEnter}
                               onDayMouseLeave={handleDayLeave}
                               onWeekClick={handleWeekClick}/>
                </ModalBody>
            </Modal>
        </div>
    )
}

const getWeekDays = weekStart => {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
        days.push(
            moment(weekStart)
                .add(i, 'days')
                .toDate()
        );
    }
    return days;
}

const getWeekRange = date => {
    return {
        from: moment(date)
            .startOf('week')
            .toDate(),
        to: moment(date)
            .endOf('week')
            .toDate(),
    };
}


export default CurrentWeekPicker;
