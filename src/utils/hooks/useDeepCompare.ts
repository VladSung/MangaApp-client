import { isEqual } from "lodash-es";
import {DependencyList, useRef} from "react";

export const useDeepCompare = (
    value: DependencyList | undefined
): DependencyList | undefined => {
    const ref = useRef<DependencyList | undefined>();
    if (!isEqual(ref.current, value)) {
        ref.current = value;
    }
    return ref.current;
};