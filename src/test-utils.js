import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { store as myStore } from './store';
import { Provider } from 'react-redux'
import { INITIAL_STATE as reducerInitialState, reducer } from './store/modules/auth/reducer';

function render(
    ui,
    {
        INITIAL_STATE = reducerInitialState,
        store = myStore,
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }