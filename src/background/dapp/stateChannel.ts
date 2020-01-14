import { Signature, StateChannelApi } from 'tesra-dapi';
import { getRequestsManager } from '../requestsManager';


export const stateChannelApi: StateChannelApi = {
    login(): Promise<string> {
        return getRequestsManager().initStateChannelLogin();
    },
    sign(): Promise<Signature> {
        throw new Error(('Not supported now'));
    }
}