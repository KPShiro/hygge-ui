import { merge, pick } from 'lodash-es';
import { ActionReducer, Action } from '@ngrx/store';


export interface IStorageMetareducerConfig {
    storageKey: string;
    stateKeysToSave: string[];
}

export function createStorageMetareducer<S, A extends Action = Action>(config: IStorageMetareducerConfig) {
    let onInit = true;

    return (_reducer: ActionReducer<S, A>) => {
        return (state: S, action: A): S => {
            const nextState = _reducer(state, action);

            if (onInit) {
                onInit = false;
                const savedState = JSON.parse(localStorage.getItem(config.storageKey));

                return merge(nextState, savedState);
            }

            const stateToSave = JSON.stringify(pick(nextState, config.stateKeysToSave));
            localStorage.setItem(config.storageKey, stateToSave);

            return nextState;
        };
    };
}
