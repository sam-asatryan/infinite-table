# Infinite Table

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Click [here](https://sam-asatryan.github.io/infinite-table) for live preview

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm run build`

### `npm run eject`

## What is implemented

- Table with 6 columns
- Select in each cell with search
- Ability to add a new option if it doesn't exist
- Ability to add more lines
- Optimized state updates to not block rendering and/or user actions (update with batches)
- Ability to select a value for each line (the cells on the right are resetting)
- Rendering only the visible part of table using react-window

## What is not implemented
- Options child/parent connection for each row (I'm not sure if I got how it should work)
- Export on click to Save button (Not sure what I should export)
