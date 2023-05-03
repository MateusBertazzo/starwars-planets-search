import React from "react";
import App from '../App'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockData from "./mockData";

describe('Testa aplicação', () => {

  beforeEach(() => {
   jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockData)
   }))
  })

  it('Verifica se é chamado o Fetch corretamente', () => {
    render(<App />)
    const url = 'https://swapi.dev/api/planets'
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('testa se a página renderiza um h1 com o texto "Star Wars Planets"', () => {
    render(<App />)
    const getInput = screen.getByRole('heading', {  name: /star wars planets/i})
    expect(getInput).toBeDefined()
  })

  it('testa o Form', () => {
  render(<App />)
  const getName = screen.getByTestId('name-filter');
  const getColumn = screen.getByTestId('column-filter');
  const getComparison = screen.getByTestId('comparison-filter');
  const getvalue = screen.getByTestId('value-filter');

  expect(getName).toBeDefined()
  expect(getColumn).toBeDefined()
  expect(getComparison).toBeDefined()
  expect(getvalue).toBeDefined()
 })
 
  it('testa se o filtro da coluna funciona', () => {
  render(<App />)
  const getInput = screen.getByTestId('column-filter');
  expect(getInput).toBeDefined();
  userEvent.selectOptions(getInput, 'population')

  const getButton = screen.getByTestId('button-filter');
  userEvent.click(getButton)
  })

  it('testa o filtro de numero', () => {
    render(<App />)

    const getInputColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(getInputColumn, 'population')

    const getInputComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getInputComparison, 'menor que')

    const getInputValue = screen.getByTestId('value-filter');
    userEvent.type(getInputValue, '1000')

    const getButton = screen.getByTestId('button-filter');
    userEvent.click(getButton)
  })

  it('testa se multiplos filtros funcionam', () => {
    render(<App />)
    const getInputColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(getInputColumn, 'population')

    const getInputComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getInputComparison, 'igual a')

    const getInputValue = screen.getByTestId('value-filter');
    userEvent.type(getInputValue, '1000')

    const getButton = screen.getByTestId('button-filter');
    userEvent.click(getButton)


    const getInputColumn2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getInputColumn2, 'diameter')

    const getInputComparison2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getInputComparison2, 'maior que')

    const getInputValue2 = screen.getByTestId('value-filter');
    userEvent.type(getInputValue2, '10000')

    const getButton2 = screen.getByTestId('button-filter');
    userEvent.click(getButton2)
  })
})