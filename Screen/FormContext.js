import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      age: '',
      imageUri: null,
    },
    vehicleInfo: {
      selectedVehicle: 'Car',
      seats: '18',
      model: '2019',
      imageUri: null,
    },
    routeInfo: {
      startPoint: '',
      destination: '',
      price: '',
    },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
