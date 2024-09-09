import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", ""); // KEY a60564ee-a072-49e5-8afb-e25dd322a44f

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
        }
        window.alert('Success, Form Submitted!', formData);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div>
            <form className="container d-flex flex-column justify-content-center min-vh-100" onSubmit={handleSubmit}>
                <div>
                    <h1 className="title text-glow" >Contact</h1>
                    <label className="form-label font-extrabold text-black drop-shadow-lg text-glow" htmlFor="name">Name</label>
                    <input className="form-control inputField glow bg-light"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="form-label font-extrabold text-black drop-shadow-lg text-glow" htmlFor="email">Email</label>
                    <input className="form-control inputField glow bg-light"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className>
                    <label className="form-label font-extrabold text-black drop-shadow-lg text-glow" htmlFor="message">Message</label>
                    <textarea className="form-control textareaField glow bg-light"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button className="mt-2 mb-2 submitButton text-glow" type="submit"  >Let's Unite</button>
            </form>
        </div>
    );
}
