import React, { useReducer, createContext } from 'react';

export const FormDataContext = createContext();

export const FormDataProvider = (props) => {
  const { children } = props || {};

  // Set initial state
  const initialState = {
    currentStep: 1,
    futureStep: null,
    previousSteps: [], // Store previous steps in an array
    formData: [],
    hasReachedConfirmation: false,
  };

  // Reducer function
  const reducer = (state, action) => {
    
    // console.log(state.previousSteps, 'prev')
    // console.log(state.currentStep, 'current')
    // console.log(action.payload.futureStep, 'Further')
    switch (action.type) {
      case 'UPDATE_FORM_DATA': {
        let found = false;
        const updatedFormData = state.formData.map(item => {
          if (item.pageId === action.payload.pageId) {
            found = true;
            return action.payload;
          }
          return item;
        });

        if (!found) {
          updatedFormData.push(action.payload);
        }

        return {
          ...state,
          formData: updatedFormData,
        };
      }
      case 'UPDATE_STEP': {
        return {
          ...state,
          previousSteps: [...state.previousSteps, action.payload.currentStep], // Store previous step
          currentStep: action.payload.nextStep,
          futureStep: action.payload.futureStep !== undefined ? action.payload.futureStep : state.futureStep,
        };
      }
      case 'GO_BACK': {
        const previousSteps = [...state.previousSteps]; // Create a copy of the previous steps array
        const previousStep = previousSteps.pop(); // Get the previous step from the array
        return {
          ...state,
          previousSteps,
          currentStep: previousStep || 0, // If there's no previous step, go back to the first step
        };
      }
      case 'REACHED_CONFIRMATION': {
        return {
          ...state,
          hasReachedConfirmation: action.payload,
        };
      }
      default:
        return state; // Return current state for unrecognized actions
    }
  };

  // Initialize state with useReducer
  const [formState, formDispatch] = useReducer(reducer, initialState);

  return (
    <FormDataContext.Provider value={[formState, formDispatch]}>
      {children}
    </FormDataContext.Provider>
  );
};
