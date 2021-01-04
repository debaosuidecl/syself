//@ts-nocheck

import React from "react";
import Skeleton from "react-loading-skeleton";
function LoadingSkeleton() {
  return (
    <div>
      <Skeleton height={30} />
      <br />
      <Skeleton height={30} width="80%" />
      <br />
      <Skeleton height={30} width="100%" />
      <br />
      <Skeleton height={480} count={1} />
    </div>
  );
}

export default LoadingSkeleton;
