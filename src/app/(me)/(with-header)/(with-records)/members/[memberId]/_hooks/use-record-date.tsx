'use client';

import { formatISO } from 'date-fns';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useState,
} from 'react';

export function useRecordDate() {
  const { date, setDate } = use(Context);

  return {
    date,
    setDate,
  };
}

interface Config {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

interface RecordDateProviderProps {
  children: ReactNode;
}
export function RecordDateProvider(props: RecordDateProviderProps) {
  const [date, setDate] = useState(() =>
    formatISO(new Date(), { representation: 'date' })
  );
  return (
    <Context
      value={{
        date,
        setDate,
      }}
    >
      {props.children}
    </Context>
  );
}

const Context = createContext<Config>(null!);
