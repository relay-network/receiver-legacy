import { useQuery } from '@tanstack/react-query';
import { receiverContext } from '../context';
import {
  fetchEnsAddress,
  fetchEnsAvatar,
  fetchEnsName,
  isEnsName,
} from './primitives';
import { isEthAddress } from '@relaycc/xmtp-hooks';

export const useEnsName = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ['ens name', handle],
    async () => {
      if (!isEthAddress(handle)) {
        return null;
      } else {
        return fetchEnsName(handle);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: wait !== true,
      context: receiverContext,
    }
  );
};

export const useEnsAddress = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ['ens address', handle],
    async () => {
      if (!isEnsName(handle)) {
        return null;
      } else {
        return fetchEnsAddress(handle);
      }
    },
    {
      enabled: wait !== true,
      staleTime: 1000 * 60 * 5,
      context: receiverContext,
    }
  );
};

export const useEnsAvatar = ({
  handle,
  wait,
}: {
  handle?: string | null;
  wait?: boolean;
}) => {
  return useQuery(
    ['ens avatar', handle],
    async () => {
      if (!isEthAddress(handle) && !isEnsName(handle)) {
        return null;
      } else {
        return fetchEnsAvatar(handle);
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: wait !== true,
      context: receiverContext,
    }
  );
};
