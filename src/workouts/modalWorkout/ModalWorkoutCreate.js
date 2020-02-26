import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import ModalExerciseList from "./ModalExerciseList";
import {transformDateString} from "../../helper/TransformDateString";

const ModalWorkoutCreate = ({date, createWorkout}) => {
    const [modal, setModal] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(
        {
            name: "",
            date: "",
            notes: "",
            exercises: [
                {
                    id: Date.now().toString(),
                    name: "",
                    achieved: false,
                    sets: 0,
                    reps: 0,
                    goal: ""
                }
            ]
        })


    const workoutChange = event => {
        const transformedDate = transformDateString(date) //TODO: change location of set date for better performance
        setCurrentWorkout({...currentWorkout, [event.target.name]: event.target.value, date: transformedDate})
    }

    const onSaveWorkout = () => {
        createWorkout(currentWorkout);
        toggle()
    }


    const addExercise = () => {
        const key = Date.now().toString();
        setCurrentWorkout({
            ...currentWorkout, exercises: currentWorkout.exercises.concat({
                id: key,
                name: "",
                achieved: false,
                sets: 0,
                reps: 0,
                goal: ""
            })
        })
    }

    const updateExercise = exercise => {
        const updatedExerciseList = currentWorkout.exercises.map(e => {
            if (e.id === exercise.id) return exercise; else return e;
        })
        setCurrentWorkout({...currentWorkout, exercises: updatedExerciseList})
    }

    const deleteExercise = id => {
        const updatedExerciseList = currentWorkout.exercises.filter(e => e.id !== id)
        setCurrentWorkout({...currentWorkout, exercises: updatedExerciseList})
    }

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <Button className={"cardButton"} onClick={toggle}> Create Workout </Button>
            <Modal isOpen={modal} toggle={toggle} style={{fontSize: '8px'}}>
                <ModalHeader toggle={toggle}>Create Workout</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="workoutName">
                                Workout name
                            </Label>
                            <Col md={10}>
                                <Input onChange={workoutChange}
                                       type="text"
                                       name='name'
                                />
                            </Col>
                        </FormGroup>
                        <Row>
                            <Label xs={3}>
                                Exercise
                            </Label>
                            <Label xs={2}>
                                Sets
                            </Label>
                            <Label xs={2}>
                                Reps
                            </Label>
                            <Label xs={3}>
                                Goal
                            </Label>
                            <Label xs={1}/>
                        </Row>
                        <ModalExerciseList workout={currentWorkout} updateExercise={updateExercise}
                                           deleteExercise={deleteExercise}/>
                        <Button onClick={addExercise}>Add exercise</Button>
                        <FormGroup row>
                            <Label md={2} for="workoutNotes">
                                Notes
                            </Label>
                            <Col md={10}>
                                <Input
                                    onChange={workoutChange}
                                    type="text"
                                    name='notes'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Row className={"justify-content-end"}>
                                <Col xs={3} className="clearfix" style={{padding: '.2rem'}}>
                                    <Button onClick={onSaveWorkout} color="success">Save</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalWorkoutCreate;
