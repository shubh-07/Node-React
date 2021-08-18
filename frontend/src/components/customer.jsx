import React, { useReducer, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Loader from "react-loader-spinner";

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            name: '',
            email: '',
            contact: '',
            amount: '',
            years: ''
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

function Customer() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [loading, initiateLoading] = useState(false);

    const handleSubmit = event => {
        setSubmitting(false);
        event.preventDefault();
        initiateLoading(true);
        let url = 'http://localhost:4000/api/customer/saveCustomer';
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        fetch(url, reqOptions)
            .then((response) => response.json())
            .then((data) => {
                setSubmitting(true);
                initiateLoading(false);
            })
            .catch(err => {
                setSubmitting(false);
                initiateLoading(false);
            });
    }

    const handleChange = event => {
        setSubmitting(false);
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }
    return (
        <div className="card form-group offset-4 col-md-4 mt-2">
            <div className="card-header">
                <h2>Submit your details.</h2>
                {submitting &&
                    <div className='m-5 card-text'>
                        We will reach out to you at <b>{formData.email}</b> or <b>{formData.contact} </b> with different Investment Options.
                    </div>
                }
                {loading &&
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                }
            </div>
            <div class="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <strong>Full Name: </strong>
                        <input className="form-control" type="text" name="name" required onChange={handleChange} value={formData.name || ''} />
                    </div>
                    <div className="form-group">
                        <strong>Email: </strong>
                        <input className="form-control" type="text" name="email" required onChange={handleChange} value={formData.email || ''} />
                    </div>
                    <div className="form-group">
                        <strong>Contact: </strong>
                        <input className="form-control" type="text" name="contact" required onChange={handleChange} value={formData.contact || ''} />
                    </div>
                    <div className="form-group">
                        <strong>Investment Amount: (per month)</strong>
                        <input className="form-control" type="text" name="amount" required onChange={handleChange} value={formData.amount || ''} />
                    </div>
                    <div className="form-group">
                        <strong>Years to invest: </strong>
                        <input className="form-control" type="text" name="years" required onChange={handleChange} value={formData.years || ''} />
                    </div>
                    <button className="btn btn-primary offset-9 col-3 mt-1" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Customer;