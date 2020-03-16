import React, {useEffect, useState} from "react";
import {emptyExercise} from "../../../helper/EmptyObjects";
import {Button} from "reactstrap";

const WorkoutExerciseCreateField = ({setShowExerciseCreateField, addExercise}) => {
    const [exercise, setExercise] = useState(emptyExercise(Date.now()))

    useEffect(() => {
        console.log(exercise)
    }, [exercise])


    const handleInput = event => {
        const updatedExercise = {...exercise, [event.target.name]: event.target.value}
        setExercise(updatedExercise)
    }

    const onSaveExercise = () => {
        setShowExerciseCreateField(false)
        addExercise(exercise)
    }

    const addCustomLabel = () => {
        let exerciseCreateGrid = document.createElement("div");
        exerciseCreateGrid.className = "exerciseCreateGrid"
        let label = document.createElement("span")
        label.innerText = "What"
        let value = document.createElement("span")
        value.innerText = "Yea"
        let deleteLabel = document.createElement("button")
        deleteLabel.innerText = "-"
        exerciseCreateGrid.append(label, value, deleteLabel)

        const updatedExercise = {...exercise, [label.innerText]: value.innerText}
        setExercise(updatedExercise)
    }

    const deleteLabel = label => {
        let updatedExercise = {...exercise}
        delete updatedExercise[label]
        setExercise(updatedExercise)
    }

    return (
        <div>
            <input defaultValue={exercise.name}
                   className={"workoutNameInput"}
                   name={"name"}
                   onChange={handleInput}
            />
            <div id={"exerciseCreateContainer"}>
                {Object.keys(exercise).map(label => {
                    if (label !== "_id" && label !== "name") {
                        return (
                            <div className={"exerciseCreateGrid"} key={label}>
                                <span className={"label"}>{label}</span>
                                <span className={"value"}>{exercise[label]}</span>
                                <button className={"deleteLabel"} onClick={() => deleteLabel(label)}>-</button>
                            </div>
                        )
                    } else return null
                })}
            </div>
            <Button onClick={addCustomLabel}>add custom field</Button>
            <Button onClick={onSaveExercise}>save exercise</Button>
        </div>
    )
}


export default WorkoutExerciseCreateField;
