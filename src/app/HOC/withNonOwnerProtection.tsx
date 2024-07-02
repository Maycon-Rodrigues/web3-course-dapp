'use client';

import React, { useEffect } from 'react';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { contract } from '@/utils/contract';

export const withNonOwnerProtection = (
  WrappedComponent: React.ComponentType
) => {
  const NonOwnerProtectedComponent: React.FC = (props) => {
    const account = useActiveAccount();
    const { data: owner, isLoading: isLoadingOwner } = useReadContract({
      contract,
      method: 'function owner() view returns (address)',
      params: []
    });

    useEffect(() => {
      if (!isLoadingOwner && account?.address === owner) {
        window.location.href = '/';
      }
    }, [account, owner, isLoadingOwner]);

    if (account?.address === owner) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return NonOwnerProtectedComponent;
};
