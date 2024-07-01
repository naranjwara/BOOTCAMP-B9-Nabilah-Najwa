import React, { forwardRef, useState } from "react";
import { Form, Field } from 'react-final-form';
import "./styles.css"

/**
 * Komponen EmployeeForm untuk menampilkan form input dan menangani pengiriman data.
 * Data hasil submit akan dicetak ke konsol dan ditampilkan di bawah form dalam format array.
 * 
 * @component
 * @param {React.ReactDOM} ref - Ref untuk mengakses form dari luar komponen.
 * @return 
 * return(
 *  <EmployeeForm />
 * )
 */

const EmployeeForm = forwardRef((props, ref) => {
    const [submittedData, setSubmittedData] = useState([]); // Menyimpan data yang disubmit

    /**
     * Fungsi menangani submit form
     * Menyimpan data yang disubmit didalam state setSubmitted data.
     * @param {object} values - Nilai-nilai dari form yang disubmit.
     */
    const handleSubmit = (values) => {
        console.log(values);
        setSubmittedData([...submittedData, values]);
    };
    
    return (
        <div className="container">
            <Form
                onSubmit={handleSubmit}
                ref={ref}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <h3> Employee Form </h3>
                        <div className="firstname">
                            <label>First Name</label>
                            <Field name="firstname" component="input"/>
                        </div>
                        <div className="lastname">
                            <label>Last Name</label>
                            <Field name="lastname" component="input"/>
                        </div>
                        <div className="employed">
                            <label>
                            <Field name="employed" component="input" type="checkbox" /> Employed
                            </label>
                        </div>
                        <div className="experiences">
                            <label>Experiences</label>
                            <div>
                                <label>
                                    <Field name="experiences" component="input" type="checkbox" value="HTML" /> HTML
                                </label>
                                <label>
                                    <Field name="experiences" component="input" type="checkbox" value="CSS" /> CSS
                                </label>
                                <label>
                                    <Field name="experiences" component="input" type="checkbox" value="Javascript" /> Javascript
                                </label>
                                <label>
                                    <Field name="experiences" component="input" type="checkbox" value="NodeJS" /> NodeJS
                                </label>
                                <label>
                                    <Field name="experiences" component="input" type="checkbox" value="ReactJS" /> ReactJS
                                </label>
                            </div>
                        </div>
                        <div className="preferredTech">
                            <label>Preferred Technology</label>
                            <div>
                                <label>
                                    <Field name="preferredTech" component="input" type="checkbox" value="Front End" /> Front End
                                </label>
                                <label>
                                    <Field name="preferredTech" component="input" type="checkbox" value="Back End" /> Back End
                                </label>
                                <label>
                                    <Field name="preferredTech" component="input" type="checkbox" value="Full Stack" /> Full Stack
                                </label>
                            </div>
                        </div>
                        <div className="notes">
                            <label>Notes</label>
                            <Field name="notes" component="input" placeholder="notes" />
                        </div>
        
                        <button type="submit">Submit</button>
                        <button type="button" onClick={form.reset}>Reset</button>
                    </form>
                )}
            />
            <div className="submitteddata">
                <h5>Submitted Data</h5>
                <ul>
                    {submittedData.map((data, index) => (
                        <li key={index}>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});
export default EmployeeForm;