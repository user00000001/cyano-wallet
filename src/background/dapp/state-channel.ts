import { Signature } from 'tesra-dapi';
import { StateChannelApi } from 'tesra-dapi';

export const stateChannelApi: StateChannelApi = {
  async login(): Promise<string> {
    throw new Error('UNSUPPORTED');
  },

  async sign({  }: { channelId: string; scriptHash: string; message: string }): Promise<Signature> {
    throw new Error('UNSUPPORTED');
  },
};
