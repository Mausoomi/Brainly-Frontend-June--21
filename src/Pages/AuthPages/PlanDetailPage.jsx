import React from 'react'
import { useSelector } from 'react-redux';
import SelectPlan from '../../Components/Home/Select-Plan';

function PlanDetailPage() {


  const user = useSelector((state) => state.auth.user);

  console.log(user);

  return (
    <div className=" text-white">
      {user?.isFreePlan ? (
        user?.Active_Plan === "" ? (
          <>
            AFTER FREE PLAN TRIAL
            <SelectPlan />
          </>
        ) : (
          <>
            <p>{user?.Active_Plan} PLAN ACTIVE</p>
            <SelectPlan />
          </>
        )
      ) : (
        <>
          NO PLAN ACTIVE
          <div>
            <SelectPlan />
          </div>
        </>
      )}


    </div>
  );
}

export default PlanDetailPage