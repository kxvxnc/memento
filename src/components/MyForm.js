import React, { Component } from 'react';
import {TextField, Button} from '@material-ui/core';
import {Formik, Field} from 'formik';
import GridBoard from './GridBoard';

function weeksFrom(date) {
    let today = new Date();
    let birthday = date.split('-');
    let parseBirthday = new Date(parseInt(birthday[0]), parseInt(birthday[1]), parseInt(birthday[2]))

    return Math.round((today - parseBirthday) / (7 * 24 * 60 * 60 * 1000));
}

class MyForm extends Component {
    constructor() {
        super()
        this.state = {
            submitted: false,
            birthday: null,
            weeks: null
        }
    }
    
    render() {
        const isSubmitted = this.state.submitted;
        let content;
        if (isSubmitted) {
            content = <GridBoard weeks={this.state.weeks}/>;
        } else {
            content = (
                <Formik
                    initialValues={{ birthday: '2000-01-01' }}
                    validate={(values)=>{
                        const errors = {};
                        if (weeksFrom(values.birthday) < 0) {
                            errors.birthday = "Invalid birthday.";
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        let weeksPassed = weeksFrom(values.birthday);
                        console.log(values);
                        console.log(weeksPassed);
                        setSubmitting(false);
                        this.setState({
                            submitted: true,
                            birthday: values.birthday,
                            weeks: weeksPassed
                        })
                    }}
                >
                    {({ values, errors, isSubmitting, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Field className="dateInput" name="birthday" type="date" as={TextField} />
                            <div className="formButton">
                                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </div>
                            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        
                        </form>
                    )}
                </Formik>
            )
        }
        return content;
    }
}



export default MyForm;