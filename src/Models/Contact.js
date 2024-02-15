import React, { useState } from 'react';
import clsDataAccess from './clsDataAccess'; // Import clsDataAccess if it's a JavaScript file

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    const sql = `insert into dbo.Feedback(Name, Email, Phonenumber, Message, EntryDate) values ('${name}', '${email}', '${phoneNumber}', '${message}', '${currentDate}')`;
    
    // Call your clsDataAccess function here
    // Example: clsDataAccess.ExecuteSql(sql)

    // For demonstration purposes, console.log the SQL query
    console.log(sql);

    // Clear form fields
    clearFields();

    // Set status message
    setStatusMessage('Submit Success fully..');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border rounded"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Submit</button>
      </form>
      {statusMessage && <p className="mt-4">{statusMessage}</p>}
    </div>
  );
};

export default ContactUs;
