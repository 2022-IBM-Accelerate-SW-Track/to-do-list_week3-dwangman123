import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText("5/30/2023");
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkDuplicate = screen.getAllByText(/History Test/i);
  expect(checkDuplicate.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText("You have no todo's left");
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(element);
  const check = screen.getByText("You have no todo's left");
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText("5/30/2023");
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();

  const checkbox = screen.getByRole('checkbox')
  fireEvent.click(checkbox)
  const check2 = screen.getByText("You have no todo's left");
  expect(check2).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText("5/30/2023");
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();

  const dueDate2 = "05/30/2021";
  fireEvent.change(inputTask, { target: { value: "History Tes2"}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);
  const check2 = screen.getByText(/History Tes2/i);
  const checkDate2 = screen.getByText("5/30/2021");
  expect(check2).toBeInTheDocument();
  expect(checkDate2).toBeInTheDocument();

  const colorCheck = screen.getByTestId(/History Test/i).style.background;
  const colorCheck2 = screen.getByTestId(/History Tes2/i).style.background;
  expect(colorCheck).not.toBe(colorCheck2);


 });

