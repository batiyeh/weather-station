import React, { Component } from 'react';
import '../styles/App.css';
import transporter from "../emailAlert/testAlert";


transporter.sendMail(message, (error, info) => {
    if (error) {
        return console.log(error);
    }
});
