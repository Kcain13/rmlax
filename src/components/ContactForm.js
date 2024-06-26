import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        teamAffiliation: '',
        contactPreference: '',
        additionalComments: '',
        service: '',
        lacrosseExperience: '',
        goalieExperience: '',
        equipmentNeeds: '',
        numberOfGoalies: '',
        otherPositions: false,
        midfieldCount: '',
        attackCount: '',
        defenseCount: '',
        fogoCount: '',
        filmFocus: '',
        stringingType: '',
        headType: '',
        meshType: '',
        shooterColor: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

        // Filter formData to only include relevant fields based on the selected service
        const filteredData = {};
        const commonFields = ['name', 'email', 'phoneNumber', 'teamAffiliation', 'contactPreference', 'additionalComments', 'service'];
        commonFields.forEach(field => {
            if (formData[field]) {
                filteredData[field] = formData[field];
            }
        });

        switch (formData.service) {
            case 'individual':
                ['lacrosseExperience', 'goalieExperience', 'equipmentNeeds'].forEach(field => {
                    if (formData[field]) {
                        filteredData[field] = formData[field];
                    }
                });
                break;
            case 'group':
                ['numberOfGoalies', 'otherPositions', 'midfieldCount', 'attackCount', 'defenseCount', 'fogoCount'].forEach(field => {
                    if (formData[field]) {
                        filteredData[field] = formData[field];
                    }
                });
                break;
            case 'film':
                if (formData.filmFocus) {
                    filteredData.filmFocus = formData.filmFocus;
                }
                break;
            case 'stringing':
                ['stringingType', 'headType', 'meshType', 'shooterColor'].forEach(field => {
                    if (formData[field]) {
                        filteredData[field] = formData[field];
                    }
                });
                break;
            default:
                break;
        }

        try {
            await axios.post(`${baseURL}/api/contact`, filteredData);
            setStatus('Inquiry sent successfully');
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                teamAffiliation: '',
                contactPreference: '',
                additionalComments: '',
                service: '',
                lacrosseExperience: '',
                goalieExperience: '',
                equipmentNeeds: '',
                numberOfGoalies: '',
                otherPositions: false,
                midfieldCount: '',
                attackCount: '',
                defenseCount: '',
                fogoCount: '',
                filmFocus: '',
                stringingType: '',
                headType: '',
                meshType: '',
                shooterColor: '',
            }); // Clear form after successful submission
        } catch (error) {
            setStatus(`Error sending inquiry: ${error.response?.data || error.message}`);
            console.error('Error:', error); // Log the error for debugging
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-content">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <label className="form-label">
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                    </label>
                    <label className="form-label">
                        Service:
                        <select name="service" value={formData.service} onChange={handleChange} required className="form-select">
                            <option value="">Select a service</option>
                            <option value="individual">Individual Session</option>
                            <option value="group">Group Session</option>
                            <option value="film">Film Breakdown</option>
                            <option value="stringing">Stick Stringing</option>
                        </select>
                    </label>
                    {formData.service === 'individual' && (
                        <>
                            <label className="form-label">
                                Years of Lacrosse Experience:
                                <input type="number" name="lacrosseExperience" value={formData.lacrosseExperience} min={0} onChange={handleChange} required className="form-input" />
                            </label>
                            <label className="form-label">
                                Years Playing Goalie:
                                <input type="number" name="goalieExperience" value={formData.goalieExperience} min={0} onChange={handleChange} required className="form-input" />
                            </label>
                            <label className="form-label">
                                Do you have equipment needs?
                                <select name="equipmentNeeds" value={formData.equipmentNeeds} onChange={handleChange} required className="form-select">
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </label>
                        </>
                    )}
                    {formData.service === 'group' && (
                        <>
                            <label className="form-label">
                                Number of Goalies:
                                <input type="number" name="numberOfGoalies" value={formData.numberOfGoalies} min={0} onChange={handleChange} required className="form-input" />
                            </label>
                            <label className="form-label">
                                Would you like to add other position groups?
                                <select name="otherPositions" value={formData.otherPositions} onChange={handleChange} required className="form-select">
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                            {formData.otherPositions === 'true' && (
                                <>
                                    <label className="form-label">
                                        Midfield:
                                        <input type="number" name="midfieldCount" value={formData.midfieldCount} min={0} onChange={handleChange} className="form-input" />
                                    </label>
                                    <label className="form-label">
                                        Attack:
                                        <input type="number" name="attackCount" value={formData.attackCount} min={0} onChange={handleChange} className="form-input" />
                                    </label>
                                    <label className="form-label">
                                        Defense:
                                        <input type="number" name="defenseCount" value={formData.defenseCount} min={0} onChange={handleChange} className="form-input" />
                                    </label>
                                    <label className="form-label">
                                        Fogo:
                                        <input type="number" name="fogoCount" value={formData.fogoCount} min={0} onChange={handleChange} className="form-input" />
                                    </label>
                                </>
                            )}
                        </>
                    )}
                    {formData.service === 'film' && (
                        <label className="form-label">
                            Specific Areas of Focus:
                            <input type="text" name="filmFocus" value={formData.filmFocus} onChange={handleChange} required className="form-input" />
                        </label>
                    )}
                    {formData.service === 'stringing' && (
                        <>
                            <label className="form-label">
                                New Head or Restring?
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="stringingType"
                                            value="new head"
                                            checked={formData.stringingType === 'new head'}
                                            onChange={handleChange}
                                            required
                                            className="form-radio"
                                        />
                                        New Head
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="stringingType"
                                            value="restring"
                                            checked={formData.stringingType === 'restring'}
                                            onChange={handleChange}
                                            required
                                            className="form-radio"
                                        />
                                        Restring
                                    </label>
                                </div>
                            </label>
                            <label className="form-label">
                                Type of Head:
                                <input type="text" name="headType" value={formData.headType} onChange={handleChange} required className="form-input" />
                            </label>
                            <label className="form-label">
                                Type of Mesh:
                                <input type="text" name="meshType" value={formData.meshType} onChange={handleChange} required className="form-input" />
                            </label>
                            <label className="form-label">
                                String Color: (Shooter and Sidewall)
                                <input type="text" name="shooterColor" value={formData.shooterColor} onChange={handleChange} required className="form-input" />
                            </label>
                        </>
                    )}

                    <label className="form-label">
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
                    </label>
                    <label className="form-label">
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-input" />
                    </label>
                    <label className="form-label">
                        Team Affiliation:
                        <input type="text" name="teamAffiliation" value={formData.teamAffiliation} onChange={handleChange} className="form-input" />
                    </label>
                    <label className="form-label">
                        Contact Preference:
                        <select name="contactPreference" value={formData.contactPreference} onChange={handleChange} required className="form-select">
                            <option value="">Select a preference</option>
                            <option value="email">Email</option>
                            <option value="call">Call</option>
                            <option value="text">Text</option>
                            <option value="all the above">All the above</option>
                        </select>
                    </label>

                    <label className="form-label">
                        Additional Comments:
                        <textarea name="additionalComments" value={formData.additionalComments} onChange={handleChange} className="form-textarea"></textarea>
                    </label>
                    <button type="submit" className="form-button">Send</button>
                </form>
                {status && <p className="form-status">{status}</p>}
            </div>
        </section>
    );
};

export default ContactForm;