import { combine } from 'shamirs-secret-sharing-ts';
import { ethers } from 'ethers';
import { getUserInfo, setUserInfo } from './LocalstorageUtils';
import { getUserInfo as getUserInfoFromRemote } from './apiUtils';

export const recoverSeedWords = (shareA: string, shareB: string) => {
  const seed = combine([Buffer.from(shareA, 'hex'), Buffer.from(shareB, 'hex')]);
  return seed.toString();
};

export const getEthPrivateKeyFromSeedWords =  (seedWords: string) => {
  const eth = ethers.Wallet.fromMnemonic(seedWords);
  return eth.privateKey
}

export const getEthAddressFromSeedWords =  (seedWords: string) => {
  const eth = ethers.Wallet.fromMnemonic(seedWords);
  return eth.getAddress()
}


export const getEthPrivateKey = (part1: string, part2: string) => {
  const seedWords = recoverSeedWords(part1, part2);
  return getEthPrivateKeyFromSeedWords(seedWords);
}

export const getEthAddress = (part1: string, part2: string) => {
  const seedWords = recoverSeedWords(part1, part2);
  return getEthAddressFromSeedWords(seedWords)
}


export const getUserInfoFromLocalFirst = async (clientId: string) => {
  const localInfo = getUserInfo()
  if (localInfo) {
    return localInfo
  }

  const data = await getUserInfoFromRemote(clientId)
  setUserInfo(data)
  return data
}
