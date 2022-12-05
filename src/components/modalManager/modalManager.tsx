import React, { createElement, Fragment, useCallback, useReducer } from 'react';
type excludedKeys = 'open';

type openModalType<C extends React.ElementType = any> = (
  component: C,
  modalProps: Omit<React.ComponentProps<C>, excludedKeys> & { key?: string }
) => string;

type closeModalType = (modalKey?: string) => void;

type ModalArrComponent<C extends React.ElementType = any> = {
  key: string;
  component: C;
  modalProps: React.ComponentProps<C> & { open: boolean };
};

const initialState = {
  counter: 1,
  lastOpenedKey: undefined,
  modals: new Map(),
} as {
  counter: number;
  lastOpenedKey?: string;
  modals: Map<String, ModalArrComponent>;
};

function reducer(
  state = initialState,
  action: { type: 'open' | 'close' | 'clear'; payload: any }
) {
  const { key } = action.payload;
  switch (action.type) {
    case 'open':
      state.counter++;
      const { component, modalProps } = action.payload;
      state.lastOpenedKey = key;
      state.modals.set(key, {
        component,
        modalProps: { ...modalProps, open: true },
        key,
      });
      return { ...state };
    case 'close':
      if (state.modals.has(key)) {
        state.modals.set(key, {
          ...state.modals.get(key)!,
          modalProps: {
            ...state.modals.get(key)?.modalProps,
            open: false,
          },
        });
      }
      return { ...state };
    case 'clear':
      state.modals.delete(key);
      return { ...state };
    default:
      throw new Error();
  }
}

export let openModal = <C extends React.ElementType>(
  c: C,
  p: Omit<React.ComponentProps<C>, excludedKeys> & { key?: string }
) => '-1';

export let closeModal: closeModalType = (k) => {};

export default function ModalManager() {
  const [state, dispatch] = useReducer(reducer, initialState);

  openModal = useCallback<openModalType>(
    (component, modalProps) => {
      const key = modalProps.key ?? `modal_${state.counter + 1}`;
      dispatch({ type: 'open', payload: { component, modalProps, key } });
      return key;
    },
    [state.counter]
  );

  closeModal = useCallback(
    (key?: string) => {
      const k = key ?? state.lastOpenedKey;
      if (k) {
        dispatch({ type: 'close', payload: { key: k } });
        setTimeout(() => {
          dispatch({ type: 'clear', payload: { key: k } });
        }, 300);
      }
    },
    [state.lastOpenedKey]
  );

  return (
    <Fragment>
      {Array.from(state.modals.values()).map((m) => {
        return createElement(m.component, { ...m.modalProps, key: m.key });
      })}
    </Fragment>
  );
}
