import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useState,
} from 'react';
import { cn } from '../utils';
import { useEvent } from './use-event';

export function useDepth(showAll = false) {
  const { depth, setDepth, max } = use(DepthContext);

  const cx = useEvent((base: string, depths: Record<number, string>) => {
    const className = depths[depth];
    if (className == null) return '';
    return cn(base, className);
  });

  const prev = useEvent(() => {
    setDepth((depth) => Math.min(max, Math.max(0, depth - 1)));
  });
  const next = useEvent(() => {
    setDepth((depth) => Math.min(max, Math.max(0, depth + 1)));
  });
  const goto = useEvent((depth: number) => {
    setDepth(Math.min(max, Math.max(0, depth)));
  });
  const visible = useEvent((d: number) => {
    if (showAll) return true;
    return depth === d;
  });

  return {
    depth,
    cx,
    prev,
    next,
    goto,
    visible,
  };
}

interface DepthConfig {
  depth: number;
  max: number;
  setDepth: Dispatch<SetStateAction<number>>;
}

interface DepthProviderProps {
  max: number;
  children: ReactNode;
}
export function DepthProvider(props: DepthProviderProps) {
  const [depth, setDepth] = useState(0);
  return (
    <DepthContext
      value={{
        depth,
        setDepth,
        max: props.max,
      }}
    >
      {props.children}
    </DepthContext>
  );
}

const DepthContext = createContext<DepthConfig>(null!);
